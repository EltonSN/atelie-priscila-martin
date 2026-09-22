# Fotografias do portefólio

## Duas coisas que é preciso saber

**1. Pôr um ficheiro nesta pasta não o faz aparecer no site.**
Quem manda na grelha é `src/content/portfolio.ts` — é essa lista que define
quais as fotografias que aparecem, por que ordem, com que legenda e com que
recorte. Um ficheiro que não esteja lá referenciado fica simplesmente por usar.

**2. Ao substituir uma fotografia mantendo o mesmo nome, é preciso limpar a
cache de imagens.**
O Next.js guarda as versões otimizadas em `.next/cache/images` durante 4 horas
(`minimumCacheTTL`), indexadas pelo caminho do ficheiro. Como o caminho não
muda, continua a servir a fotografia antiga — e como a cache é do servidor, nem
recompilar nem abrir uma janela anónima resolve. Use:

```bash
pnpm build:fresh     # limpa a cache de imagens e compila
```

Ou, em desenvolvimento, `pnpm clean:images` e reinicie o `pnpm dev`.
Acrescentar uma fotografia nova, com um nome que ainda não existia, não sofre
deste problema.

## Ficheiros em uso

| Ficheiro         | Onde aparece                    | Orientação |
| ---------------- | ------------------------------- | ---------- |
| `hero.jpg`       | Imagem principal do topo        | horizontal |
| `atelier.jpg`    | Secção escura "O nosso atelier" | horizontal |
| `testemunho.jpg` | Secção do testemunho            | horizontal |
| `01.jpg`         | Portefólio                      | vertical   |
| `02.jpg`         | Portefólio                      | vertical   |
| `03.jpg`         | Portefólio                      | vertical   |
| `04.jpg`         | Portefólio — destaque           | horizontal |
| `05.jpg`         | Portefólio — destaque           | horizontal |
| `06.jpg`         | Portefólio                      | vertical   |
| `08.jpg`         | Portefólio                      | quadrada   |

## Acrescentar uma fotografia à grelha

A grelha do portefólio tem 6 colunas em ecrãs grandes e **cada linha tem de
somar 6**. Para as alturas ficarem alinhadas dentro da mesma linha, combine o
`span` com o `ratio` correspondente:

| `span` | `ratio` | Para fotografias |
| ------ | ------- | ---------------- |
| `4`    | `3 / 2` | horizontais      |
| `2`    | `3 / 4` | verticais        |
| `3`    | `4 / 3` | horizontais, meia linha |

O `ratio` tem de acompanhar a orientação real da fotografia — uma fotografia
vertical num `ratio` horizontal fica cortada ao meio.

## Recomendações

- **Formato:** JPEG ou WebP. O Next.js converte para AVIF/WebP ao servir, não é
  preciso otimizar à mão.
- **Dimensão:** cerca de 2000 px no lado maior chega para ecrãs de alta
  densidade.
- **Enquadramento:** as imagens são cortadas ao centro (`object-cover`). Deixe
  margem à volta do motivo principal.
- **Texto alternativo:** o campo `alt` em `portfolio.ts` deve descrever a
  fotografia — é lido por leitores de ecrã e indexado por motores de busca.
