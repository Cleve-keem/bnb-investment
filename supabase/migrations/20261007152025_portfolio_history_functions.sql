create or replace function public.get_portfolio_history(
    p_user_id uuid,
    p_range text default '1M' -- '1D','1W','1M','3M','6M','1Y'
)
returns table (day date, total_value numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
    v_wallet_id uuid;
    v_start_date date;
begin
    if auth.role() <> 'service_role'
        and auth.uid() is distinct from p_user_id then
        raise exception 'get_portfolio_history: unauthorized';
    end if;

    select id into v_wallet_id from public.wallets where user_id = p_user_id;
    if v_wallet_id is null then
        raise exception 'Wallet not found for user';
    end if;

    v_start_date := case p_range
        when '1D' then current_date - interval '1 day'
        when '1W' then current_date - interval '7 days'
        when '1M' then current_date - interval '1 month'
        when '3M' then current_date - interval '3 months'
        when '6M' then current_date - interval '6 months'
        when '1Y' then current_date - interval '1 year'
        else current_date - interval '1 month'
    end;

    return query
    with days as (
        select generate_series(v_start_date, current_date, interval '1 day')::date as day
    ),
    cash as (
        select d.day, coalesce(wt.balance_after, 0) as cash_balance
        from days d
        left join lateral (
            select balance_after
            from public.wallet_transactions
            where wallet_id = v_wallet_id
              and created_at::date <= d.day
            order by created_at desc
            limit 1
        ) wt on true
    ),
    invested as (
        select
            d.day,
            coalesce(sum(
                case
                    -- not yet started as of this day: contributes nothing
                    when i.started_at is null or i.started_at::date > d.day then 0
                    -- cancelled before this day: contributes nothing
                    when i.status = 'cancelled'
                         and i.cancelled_at is not null
                         and i.cancelled_at::date <= d.day then 0
                    -- started but no maturity date set yet: principal only, no accrual
                    when i.matures_at is null then i.amount
                    else
                        i.amount + i.expected_profit * least(
                            1.0,
                            greatest(
                                0.0,
                                extract(epoch from (
                                    least(d.day::timestamptz + interval '1 day', i.matures_at)
                                    - i.started_at
                                )) / extract(epoch from (i.matures_at - i.started_at))
                            )
                        )
                end
            ), 0) as invested_value
        from days d
        left join public.investments i on i.wallet_id = v_wallet_id
        group by d.day
    )
    select c.day, (c.cash_balance + inv.invested_value) as total_value
    from cash c
    join invested inv on inv.day = c.day
    order by c.day;
end;
$$;

grant execute on function public.get_portfolio_history(uuid, text) to authenticated;

create or replace function public.get_portfolio_summary(p_user_id uuid)
returns table (
    total_value numeric,
    cash_balance numeric,
    invested_value numeric,
    total_invested numeric,
    total_return numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
    v_wallet_id uuid;
    v_cash numeric;
begin
    if auth.role() <> 'service_role'
        and auth.uid() is distinct from p_user_id then
        raise exception 'get_portfolio_summary: unauthorized';
    end if;

    select id, balance into v_wallet_id, v_cash
    from public.wallets
    where user_id = p_user_id;

    if v_wallet_id is null then
        raise exception 'Wallet not found for user';
    end if;

    return query
    select
        v_cash + coalesce(sum(public.investment_current_value(i)), 0) as total_value,
        v_cash as cash_balance,
        coalesce(sum(public.investment_current_value(i)), 0) as invested_value,
        coalesce(sum(i.amount) filter (where i.status <> 'cancelled'), 0) as total_invested,
        coalesce(sum(public.investment_current_value(i)), 0)
            - coalesce(sum(i.amount) filter (where i.status <> 'cancelled'), 0) as total_return
    from public.investments i
    where i.wallet_id = v_wallet_id;
end;
$$;

grant execute on function public.get_portfolio_summary(uuid) to authenticated;



create or replace function public.get_portfolio_holdings(p_user_id uuid)
returns table (
    investment_id uuid,
    plan_name text,
    amount numeric,
    current_value numeric,
    change_percentage numeric,
    allocation_percentage numeric,
    status public.investment_status
)
language plpgsql
security definer
set search_path = public
as $$
declare
    v_wallet_id uuid;
    v_total_value numeric;
begin
    if auth.role() <> 'service_role'
        and auth.uid() is distinct from p_user_id then
        raise exception 'get_portfolio_holdings: unauthorized';
    end if;

    select id into v_wallet_id from public.wallets where user_id = p_user_id;
    if v_wallet_id is null then
        raise exception 'Wallet not found for user';
    end if;

    select coalesce(sum(public.investment_current_value(i)), 0)
    into v_total_value
    from public.investments i
    where i.wallet_id = v_wallet_id
      and i.status <> 'cancelled';

    return query
    select
        i.id,
        i.plan_name,
        i.amount,
        public.investment_current_value(i) as current_value,
        case when i.amount = 0 then 0
             else round(((public.investment_current_value(i) - i.amount) / i.amount) * 100, 2)
        end as change_percentage,
        case when v_total_value = 0 then 0
             else round((public.investment_current_value(i) / v_total_value) * 100, 2)
        end as allocation_percentage,
        i.status
    from public.investments i
    where i.wallet_id = v_wallet_id
      and i.status <> 'cancelled'
    order by public.investment_current_value(i) desc;
end;
$$;

grant execute on function public.get_portfolio_holdings(uuid) to authenticated;