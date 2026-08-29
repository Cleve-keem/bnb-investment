-- ============================================================
-- Automatically create public.user referral code trigger
-- ============================================================

create or replace function public.generate_referral_code()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
    v_code text;
begin
    loop
        v_code := 'BNB-' || upper(
            substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)
        );

        exit when not exists (
            select 1
            from public.users
            where referral_code = v_code
        );
    end loop;

    return v_code;
end;
$$;

-- ===================================================================
-- Automatically create an Auth → public.users synchronization trigger
-- ===================================================================

create or replace function public.sync_user_email_verification()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

    update public.users
    set
        email_verified_at = new.email_confirmed_at,
        updated_at = timezone('utc', now())
    where id = new.id;

    return new;

end;
$$;

drop trigger if exists on_auth_user_email_verified
on auth.users;

create trigger on_auth_user_email_verified
after update of email_confirmed_at
on auth.users
for each row
when (
    old.email_confirmed_at is distinct from new.email_confirmed_at
)
execute function public.sync_user_email_verification();


-- ================================================================
-- Automatically create a backend function for first-login OTP
-- ================================================================

create or replace function public.prepare_first_login_otp(
    p_user_id uuid
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
    v_first_login boolean;
    v_email_verified_at timestamptz;
begin

    select
        first_login,
        email_verified_at
    into
        v_first_login,
        v_email_verified_at
    from public.users
    where id = p_user_id;

    if not found then
        raise exception 'User profile not found';
    end if;

    if v_email_verified_at is null then
        raise exception 'Email has not been verified';
    end if;

    if not v_first_login then
        raise exception 'First login has already been completed';
    end if;

    return public.generate_otp(
        p_user_id,
        'login'
    );

end;
$$;

revoke all on function public.prepare_first_login_otp(uuid)
from public;

grant execute on function public.prepare_first_login_otp(uuid)
to service_role;


-- ===========================================================
-- Atomically consume the OTP AND first_login
-- ===========================================================

create or replace function public.complete_first_login(
    p_user_id uuid,
    p_code text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
    v_verified boolean;
begin

    select public.verify_otp(
        p_user_id,
        'login',
        p_code
    )
    into v_verified;

    if not v_verified then
        return false;
    end if;

    update public.users
    set
        first_login = false,
        last_login_at = timezone('utc', now()),
        updated_at = timezone('utc', now())
    where id = p_user_id
      and first_login = true;

    return true;

end;
$$;