-- =============================================================================
-- Automatically create public.users profile after auth.users signup
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

    insert into public.users (
        id,
        email,
        username,
        full_name,
        phone,
        referral_code
    )
    values (
        new.id,
        new.email,
        new.raw_user_meta_data->>'username',
        new.raw_user_meta_data->>'full_name',
        new.raw_user_meta_data->>'phone',
        public.generate_referral_code()
    );

    return new;

end;
$$;


drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
