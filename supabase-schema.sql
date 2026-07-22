-- Schema untuk toko online yang lebih lengkap
create extension if not exists "pgcrypto";

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  category_id uuid references public.categories(id) on delete set null,
  rating numeric(2,1) not null default 0,
  review_count integer not null default 0,
  price numeric not null default 0,
  old_price numeric,
  badge_text text,
  badge_type text,
  image_url text,
  alt_text text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  sku text unique,
  price numeric not null default 0,
  stock_quantity integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'categories'
      and policyname = 'allow_read_access_to_categories'
  ) then
    create policy "allow_read_access_to_categories" on public.categories
      for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'categories'
      and policyname = 'allow_insert_access_to_categories'
  ) then
    create policy "allow_insert_access_to_categories" on public.categories
      for insert with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'categories'
      and policyname = 'allow_update_access_to_categories'
  ) then
    create policy "allow_update_access_to_categories" on public.categories
      for update using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'categories'
      and policyname = 'allow_delete_access_to_categories'
  ) then
    create policy "allow_delete_access_to_categories" on public.categories
      for delete using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'allow_read_access_to_products'
  ) then
    create policy "allow_read_access_to_products" on public.products
      for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'allow_insert_access_to_products'
  ) then
    create policy "allow_insert_access_to_products" on public.products
      for insert with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'allow_update_access_to_products'
  ) then
    create policy "allow_update_access_to_products" on public.products
      for update using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'allow_delete_access_to_products'
  ) then
    create policy "allow_delete_access_to_products" on public.products
      for delete using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'product_variants'
      and policyname = 'allow_read_access_to_product_variants'
  ) then
    create policy "allow_read_access_to_product_variants" on public.product_variants
      for select using (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'product_variants'
      and policyname = 'allow_insert_access_to_product_variants'
  ) then
    create policy "allow_insert_access_to_product_variants" on public.product_variants
      for insert with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'product_variants'
      and policyname = 'allow_update_access_to_product_variants'
  ) then
    create policy "allow_update_access_to_product_variants" on public.product_variants
      for update using (true) with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'product_variants'
      and policyname = 'allow_delete_access_to_product_variants'
  ) then
    create policy "allow_delete_access_to_product_variants" on public.product_variants
      for delete using (true);
  end if;
end $$;

insert into public.categories (name, slug, description)
values
  ('Elektronik', 'elektronik', 'Produk elektronik'),
  ('Komputer', 'komputer', 'Perangkat komputer'),
  ('Office', 'office', 'Peralatan kantor')
on conflict (slug) do nothing;

delete from public.product_variants;
delete from public.products;

insert into public.products (id, name, category, rating, review_count, price, old_price, badge_text, badge_type, image_url, alt_text)
values
  (gen_random_uuid(), 'EliteSound Wireless Headset Pro - Noise Cancelling', 'GADGET', 4.0, 128, 1999200, 2499000, 'SALE 20%', 'error', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyV1n-4egGtvgzrSU4OjwAxdiOY-P2ZpuNu9GINy1YhE4E0yT_-CMPZkU7_5LZjfsDZOo4eV2h-eN0kUGQa4OqTmRnh3D51w7_W4MenlqbBIO8LCzx26h-bDr6IcVFeBKp5T01dWAxqh5FdaUwYTfgnZeDP7FLAPbjSPCv2TfX6JyTAIWr7PmzaLNuh3cjziUsqzfhX3WbyIVLoXAsSPgU_tcGZARCHORAqnDJQoqUJlXYmPAs3vKIxCHJsMW_cuEzov8-5qWNx01s', 'A premium wireless noise-canceling headphone in matte charcoal grey finish'),
  (gen_random_uuid(), 'KeyMaster K890 Mechanical Keyboard Blue Switch', 'COMPUTER', 5.0, 45, 850000, null, null, null, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgdUua6MROCE6ZYlJCs1W-jFtxkIz1-FWLwkQ4wLbbByo7crglPsFhKJ19Iv-qv5jtjWag9gz5pR2hjM7jyw67x9dRoCc4QWEQuDvTjc8HK1ONeHrcCJ9551IIMf-4nm_yKQ3WFuLHdI3xQayzelP3GJ_jT31w5tgwq_nCChF-jg9LXwgxGFeW45nDRaMIymJYyUzi_vbwxF5kGs5yway-8sO86Z31eSdqpzvwle01JOga72w7XOg1xHkOqxeSWZbL0T9yYnhbPuTH', 'A modern mechanical ergonomic keyboard with RGB backlighting'),
  (gen_random_uuid(), 'ErgoForm Mesh Office Chair v2.0 - Grey Chrome', 'OFFICE', 4.5, 312, 3450000, null, 'BEST SELLER', 'secondary', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYnN0lVtdXWD730V2YBpARqQG5TEKAUB08zdgNhMTvJd3ZYMXUJu5psAo6TggrHGufXYEU3rmicbTcUoxHImymqHlFShFWfBs-BQU3B_IyVLBSLIpuQmPF-oe4PEa1h7uhkbMJNXTSQQu6wKW9yw25ozTla9U2P9pe0110Fwj21cHjBAkPdpCTj_AEQYLbVuBNaA2UndyoSVWFapBonM4VvVMGLSczHzMiOKoOJ50EWNO10ikYUs0t1kZbzu9-_Z0AHyOVXWW--0xO', 'A minimalist professional office chair in breathable black mesh');

insert into public.product_variants (product_id, name, sku, price, stock_quantity)
select p.id, 'Default', 'SKU-' || substr(p.id::text, 1, 8), p.price, 50
from public.products p
where not exists (
  select 1 from public.product_variants pv where pv.product_id = p.id
);
