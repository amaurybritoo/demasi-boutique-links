-- DEMASI LINKS v4 — banco da página Linktree + perfis futuros
create extension if not exists pgcrypto;

create table if not exists public.link_page_settings (
  id integer primary key default 1,
  name text not null default 'Demasi Boutique',
  bio text default 'Elegância que combina com você.',
  logo_url text,
  background_url text,
  address text default 'Rua Dom Milton Correia Pereira, 1010, Parque 10 de Novembro, Manaus — AM, 69055-440, Brasil',
  location_query text default 'Demasi Boutique, Rua Dom Milton Correia Pereira, 1010, Manaus, AM',
  whatsapp text,
  instagram text,
  tiktok text,
  vip text,
  catalogo text default 'https://demasi-boutique.vercel.app/#catalogo',
  updated_at timestamptz default now()
);

create table if not exists public.link_page_profiles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  bio text default 'Elegância que combina com você.',
  logo_url text,
  background_url text,
  address text,
  location_query text,
  whatsapp text,
  instagram text,
  tiktok text,
  vip text,
  catalogo text,
  enabled boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.link_page_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.link_page_profiles(id) on delete cascade,
  type text not null default 'link',
  title text not null,
  subtitle text,
  url text not null,
  icon text,
  enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

alter table public.link_page_settings add column if not exists vip text;
alter table public.link_page_profiles add column if not exists vip text;
alter table public.link_page_links add column if not exists profile_id uuid references public.link_page_profiles(id) on delete cascade;

insert into public.link_page_settings(id,name,bio,whatsapp,instagram,tiktok,vip,catalogo)
values (
  1,
  'Demasi Boutique',
  'Elegância que combina com você.',
  'https://api.whatsapp.com/send/?phone=92984194325&text=Ol%C3%A1%2C+Demasi%21+Vim+pelo+Instagram+e+gostaria+de+conhecer+as+pe%C3%A7as.&type=phone_number&app_absent=0',
  'https://www.instagram.com/demasi.boutique/',
  '',
  'https://chat.whatsapp.com/FbHcH09HqTsF61CAkp1VCK?s=cl&p=i&mlu=4&ilr=4',
  'https://demasi-boutique.vercel.app/#catalogo'
)
on conflict(id) do nothing;

-- Corrige instalações anteriores que possam ter colocado o link VIP no campo TikTok.
update public.link_page_settings
set tiktok='',
    vip='https://chat.whatsapp.com/FbHcH09HqTsF61CAkp1VCK?s=cl&p=i&mlu=4&ilr=4'
where id=1;

-- Canais principais do perfil principal.
update public.link_page_links l
set url=s.catalogo, title='Ver nosso catálogo', subtitle='Veja as peças disponíveis', enabled=true, sort_order=0
from public.link_page_settings s
where l.profile_id is null and l.type='catalogo' and s.id=1 and coalesce(s.catalogo,'')<>'';
insert into public.link_page_links(profile_id,type,title,subtitle,url,sort_order)
select null,'catalogo','Ver nosso catálogo','Veja as peças disponíveis',s.catalogo,0
from public.link_page_settings s
where s.id=1 and coalesce(s.catalogo,'')<>''
and not exists(select 1 from public.link_page_links where profile_id is null and type='catalogo');

update public.link_page_links l
set url=s.whatsapp, title='Falar no WhatsApp', subtitle='Atendimento e novidades', enabled=true, sort_order=1
from public.link_page_settings s
where l.profile_id is null and l.type='whatsapp' and s.id=1 and coalesce(s.whatsapp,'')<>'';
insert into public.link_page_links(profile_id,type,title,subtitle,url,sort_order)
select null,'whatsapp','Falar no WhatsApp','Atendimento e novidades',s.whatsapp,1
from public.link_page_settings s
where s.id=1 and coalesce(s.whatsapp,'')<>''
and not exists(select 1 from public.link_page_links where profile_id is null and type='whatsapp');

update public.link_page_links l
set url=s.instagram, title='Instagram', subtitle='Acompanhe a Demasi', enabled=true, sort_order=2
from public.link_page_settings s
where l.profile_id is null and l.type='instagram' and s.id=1 and coalesce(s.instagram,'')<>'';
insert into public.link_page_links(profile_id,type,title,subtitle,url,sort_order)
select null,'instagram','Instagram','Acompanhe a Demasi',s.instagram,2
from public.link_page_settings s
where s.id=1 and coalesce(s.instagram,'')<>''
and not exists(select 1 from public.link_page_links where profile_id is null and type='instagram');

-- TikTok fica pronto para o futuro, mas não aparece enquanto não houver URL.
update public.link_page_links l
set url=s.tiktok, title='TikTok', subtitle='Siga a Demasi', enabled=(coalesce(s.tiktok,'')<>''), sort_order=3
from public.link_page_settings s
where l.profile_id is null and l.type='tiktok' and s.id=1;

update public.link_page_links l
set url=s.vip, title='Grupo VIP', subtitle='Ofertas exclusivas e novidades em primeira mão', enabled=true, sort_order=4
from public.link_page_settings s
where l.profile_id is null and l.type='vip' and s.id=1 and coalesce(s.vip,'')<>'';
insert into public.link_page_links(profile_id,type,title,subtitle,url,sort_order)
select null,'vip','Grupo VIP','Ofertas exclusivas e novidades em primeira mão',s.vip,4
from public.link_page_settings s
where s.id=1 and coalesce(s.vip,'')<>''
and not exists(select 1 from public.link_page_links where profile_id is null and type='vip');

alter table public.link_page_settings enable row level security;
alter table public.link_page_profiles enable row level security;
alter table public.link_page_links enable row level security;

drop policy if exists "public read link settings" on public.link_page_settings;
drop policy if exists "auth manage link settings" on public.link_page_settings;
drop policy if exists "public read profiles" on public.link_page_profiles;
drop policy if exists "auth manage profiles" on public.link_page_profiles;
drop policy if exists "public read enabled links" on public.link_page_links;
drop policy if exists "auth manage links" on public.link_page_links;

create policy "public read link settings" on public.link_page_settings for select using (true);
create policy "auth manage link settings" on public.link_page_settings for all to authenticated using (true) with check (true);
create policy "public read profiles" on public.link_page_profiles for select using (enabled=true);
create policy "auth manage profiles" on public.link_page_profiles for all to authenticated using (true) with check (true);
create policy "public read enabled links" on public.link_page_links for select using (enabled=true);
create policy "auth manage links" on public.link_page_links for all to authenticated using (true) with check (true);

insert into storage.buckets (id,name,public)
values ('link-assets','link-assets',true)
on conflict (id) do update set public=true;

drop policy if exists "Public read link assets" on storage.objects;
drop policy if exists "Authenticated manage link assets" on storage.objects;
create policy "Public read link assets" on storage.objects for select using (bucket_id='link-assets');
create policy "Authenticated manage link assets" on storage.objects for all to authenticated using (bucket_id='link-assets') with check (bucket_id='link-assets');
