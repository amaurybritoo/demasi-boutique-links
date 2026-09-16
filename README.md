# Demasi Boutique — Links v2

Página independente, estilo Linktree, pensada primeiro para celular e usada como link da bio.

## O que mudou no v2
- Layout mobile-first e responsivo.
- Animações premium: entrada dos cards, brilho, hover, logo flutuante, partículas/chuva dourada e efeitos ambientais.
- Compartilhamento pelo celular usando o recurso nativo quando disponível.
- Estrutura de links genérica: TikTok, YouTube, site, promoções, catálogos e outros canais podem ser adicionados pelo painel.
- Estrutura multi-loja/perfil: o painel permite criar outros perfis sem refazer o site.
- Cada perfil futuro pode usar uma URL própria no formato `/loja/slug`.
- Os canais principais preenchidos na identidade sincronizam com os botões da página.
- Catálogo atual continua sendo um destino externo: `https://demasi-boutique.vercel.app/#catalogo`.

## Configuração
1. No Supabase, execute `supabase/link_page.sql`.
2. Faça deploy deste projeto como um projeto Vercel separado.
3. Acesse `/admin` para entrar na área privada.
4. O login é feito pelo Supabase Auth.

## Observação de segurança
A rota `/admin` não aparece no site público, mas a proteção real é feita pelo Supabase Auth + RLS. Não dependa apenas do fato de a URL ser escondida.
