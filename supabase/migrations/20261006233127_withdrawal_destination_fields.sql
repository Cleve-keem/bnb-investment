-- =============================================================================
-- 015_withdrawal_destination_fields.sql
-- withdrawal_requests has no columns for what a crypto withdrawal actually
-- needs (asset, network, destination address) -- adding them as real
-- columns, not buried in metadata, since admins need to read these reliably.
-- =============================================================================

alter table public.withdrawal_requests
    add column if not exists asset text,
    add column if not exists network text,
    add column if not exists destination_address text;

comment on column public.withdrawal_requests.destination_address is
'Wallet address funds should be sent to.';

-- Assumes public.set_updated_at() already exists in this project (same
-- helper used elsewhere, e.g. on users/wallets) -- skip this if it doesn't
-- apply here, or swap in whatever trigger function this project actually uses.
drop trigger if exists withdrawal_requests_set_updated_at on public.withdrawal_requests;
create trigger withdrawal_requests_set_updated_at
before update on public.withdrawal_requests
for each row
execute function public.set_updated_at();