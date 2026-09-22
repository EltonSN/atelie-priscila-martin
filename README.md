# Atelier Priscila Martin

Landing page do Atelier Priscila Martin — cortinados por medida, Portugal.
Página única, estática, em português de Portugal, construída para conversão por
WhatsApp.

## Stack

- **Next.js 16** (App Router, React 19) — a página é pré-renderizada por
  completo (`○ Static`), sem servidor aplicacional em runtime.
- **Tailwind CSS 4** — tokens de design definidos em `@theme`, dentro de
  `src/app/globals.css`.
- **TypeScript** em modo estrito.
- **pnpm** como gestor de pacotes.

## Como correr

```bash
pnpm install
pnpm dev        # servidor de desenvolvimento em http://localhost:3000
pnpm build      # compilação de produção
pnpm build:fresh # idem, limpando primeiro a cache de imagens otimizadas
pnpm start      # serve a compilação de produção
pnpm lint       # ESLint
pnpm typecheck  # TypeScript sem emitir ficheiros
```

## Estrutura

```
src/
  app/                 layout, página, metadados, robots, sitemap e ícones
  components/
    layout/            cabeçalho e rodapé
    sections/          uma secção da página por ficheiro
    seo/               dados estruturados JSON-LD
    ui/                blocos reutilizáveis (botão, ícones, marca, revelação…)
  content/             todo o texto e dados editáveis do site
public/
  logo/                variantes do logótipo com fundo transparente
  portfolio/           fotografias dos trabalhos (ver README da pasta)
scripts/               utilitários de preparação de imagens (não vão para o bundle)
```

**Toda a informação editável vive em `src/content/`.** Para mudar textos,
contactos, serviços, passos do processo ou perguntas frequentes não é preciso
tocar nos componentes.

## Design system

Definido em `src/app/globals.css`, no bloco `@theme`.

| Papel                 | Token                    | Valor     |
| --------------------- | ------------------------ | --------- |
| Fundo da página       | `--color-bone`           | `#f2eee6` |
| Superfície clara      | `--color-cream`          | `#faf7f2` |
| Secções escuras       | `--color-espresso`       | `#2a211c` |
| Texto principal       | `--color-ink`            | `#241d18` |
| Texto secundário      | `--color-ink-soft`       | `#5e544c` |
| Acento (terracota)    | `--color-clay`           | `#b0714b` |
| Acento em texto       | `--color-clay-deep`      | `#8c5231` |
| Dourado da marca      | `--color-gold`           | `#c9a227` |

Tipografia: **EB Garamond** nos títulos e **Jost** em texto e interface — a
geométrica mais próxima do lettering do logótipo.

Todos os pares de cor usados em texto cumprem o contraste WCAG AA (4.5:1 em
texto corrente, 3:1 em texto grande e elementos gráficos).

## Logótipo

O ficheiro original (`public/logo/original-priscila-martin.png`) é dourado sobre
preto opaco, o que o torna inutilizável sobre fundos claros. O script
`scripts/prepare-logo.mjs` deriva dele quatro variantes com fundo transparente,
mais os ícones da aplicação:

```bash
node scripts/prepare-logo.mjs public/logo/original-priscila-martin.png
```

| Ficheiro                        | Uso                                    |
| ------------------------------- | -------------------------------------- |
| `public/logo/lockup-gold.png`   | lockup completo, fundos escuros        |
| `public/logo/lockup-ink.png`    | lockup completo, fundos claros         |
| `public/logo/monogram-gold.png` | monograma, fundos escuros              |
| `public/logo/monogram-ink.png`  | monograma, fundos claros (cabeçalho)   |
| `src/app/icon.png`              | favicon                                |
| `src/app/apple-icon.png`        | ícone de ecrã inicial em iOS           |

Se houver um logótipo vetorial (SVG) original, prefira-o: substitua os ficheiros
e ajuste `src/components/ui/Logo.tsx`.

## Fotografias

Ver `public/portfolio/README.md`. Dois pontos que costumam causar confusão:

- Pôr um ficheiro em `public/portfolio/` não o faz aparecer no site — a grelha
  é definida por `src/content/portfolio.ts`.
- Ao **substituir** uma fotografia mantendo o mesmo nome, é preciso limpar a
  cache de imagens otimizadas do Next (`pnpm build:fresh`), senão continua a ser
  servida a versão antiga durante 4 horas.

Enquanto um ficheiro não existir, a página mostra um marcador gráfico em vez de
uma imagem partida.

## Publicação na Vercel

O projeto é um Next.js normal: a Vercel deteta a framework, o comando de
compilação e a pasta de saída sozinha. Não é preciso `vercel.json`. O que
convém verificar:

**Gestor de pacotes.** A Vercel escolhe a versão de pnpm pelo `lockfileVersion`
do `pnpm-lock.yaml` (aqui `9.0` → pnpm 9 ou 10), e **ignora** o campo
`packageManager` do `package.json` a não ser que o Corepack esteja ligado.
Não ligue o Corepack (`ENABLE_EXPERIMENTAL_COREPACK`): a Vercel suporta pnpm
6–10 e este projeto declara `pnpm@12.4.2`, que não está nessa lista. Se alguma
vez a instalação falhar por causa da versão, o caminho é remover o campo
`packageManager` ou fixar o comando de instalação em Settings → Build &
Development Settings.

**Node.js.** O valor por omissão (24.x, a LTS mais recente) serve. Só mexa em
Settings → Build and Deployment → Node.js Version se houver motivo.

**Variável de ambiente.** A única necessária:

| Nome                   | Ambiente   | Valor                              |
| ---------------------- | ---------- | ---------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://atelierpriscilamartin.pt` |

Define o domínio anunciado no `metadataBase`, nos canonical, no `sitemap.xml`,
no `robots.txt` e nos dados estruturados. Enquanto o domínio próprio não
estiver ligado, pode deixá-la por definir: o site usa então o domínio de
produção que a Vercel atribui (`VERCEL_PROJECT_PRODUCTION_URL`). Ver
`.env.example`.

Não a defina no ambiente Preview — assim as pré-visualizações apontam para o
seu próprio endereço em vez de anunciarem o domínio de produção.

**Domínio.** Em Settings → Domains, acrescente `atelierpriscilamartin.pt` e
`www.atelierpriscilamartin.pt` e configure no registrar os registos DNS que a
Vercel indicar. Depois de o domínio responder, defina o
`NEXT_PUBLIC_SITE_URL` e volte a publicar, para o sitemap e os canonical
passarem a apontar para ele.

**Substituir fotografias depois de publicado.** A otimização de imagens é feita
e guardada em cache pela Vercel, indexada pelo caminho do ficheiro. Substituir
uma fotografia mantendo o mesmo nome pode continuar a servir a versão antiga
durante algum tempo — o mesmo comportamento descrito em
`public/portfolio/README.md` para o ambiente local. O hábito seguro é dar um
nome novo ao ficheiro e atualizar `src/content/portfolio.ts`.

## Por rever antes de publicar

Os pontos abaixo estão marcados com `TODO(cliente)` no código:

- **`src/content/site.ts`** — domínio final (`url`) e zona de atendimento
  (`serviceArea`).
- **`src/content/testimonials.ts`** — o testemunho atual é um marcador de
  posição. Substituir por um testemunho real e autorizado pelo cliente.
- **`src/content/portfolio.ts`** — títulos e localizações dos projetos.

## Acessibilidade e SEO

- Idioma `pt-PT`, hierarquia de títulos `h1 → h2 → h3`, ligação "Saltar para o
  conteúdo".
- Navegação completa por teclado, com anel de foco visível em todos os
  elementos interativos.
- Animações de entrada anuladas com `prefers-reduced-motion: reduce`; sem
  JavaScript o conteúdo aparece na mesma.
- Dados estruturados `LocalBusiness` e `FAQPage`, `sitemap.xml` e `robots.txt`
  gerados automaticamente.
