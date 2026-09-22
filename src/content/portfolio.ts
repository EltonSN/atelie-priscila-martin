/**
 * Trabalhos apresentados na secção de portefólio.
 *
 * As imagens são carregadas de `public/portfolio/`. Colocar um ficheiro nessa
 * pasta não o faz aparecer no site: é esta lista que define quais aparecem, por
 * que ordem e com que legenda.
 *
 * A grelha tem 6 colunas em ecrãs grandes e cada linha tem de somar 6. Para as
 * alturas ficarem alinhadas dentro da mesma linha, use:
 *   - `span: 4` com `ratio: "3 / 2"`  (paisagem)
 *   - `span: 2` com `ratio: "3 / 4"`  (retrato)
 *   - `span: 3` com `ratio: "4 / 3"`  (meia linha, paisagem)
 * O `ratio` deve acompanhar a orientação real da fotografia, senão o recorte
 * corta-a ao meio.
 *
 * TODO(cliente): confirmar títulos e localizações — descrevem o que se vê nas
 * fotografias, mas não sabemos os projetos reais.
 */
export type PortfolioItem = {
  src: string;
  alt: string;
  title: string;
  location: string;
  /** Colunas ocupadas na grelha de 6 colunas, em ecrãs grandes. */
  span: 2 | 3 | 4;
  /** Proporção do recorte. Deve seguir a orientação da fotografia. */
  ratio: string;
};

export const portfolioItems: PortfolioItem[] = [
  // Linha 1 — 4 + 2
  {
    src: "/portfolio/04.jpg",
    alt: "Sala e cozinha em espaço aberto com cortinado em onda (Wave) a cobrir a porta de correr",
    title: "Cortinado em Onda (Wave)",
    location: "Sala e cozinha",
    span: 4,
    ratio: "3 / 2",
  },
  {
    src: "/portfolio/01.jpg",
    alt: "Sala comum com voile branco em calha Wave, do teto ao chão",
    title: "Voile em calha Wave",
    location: "Sala comum",
    span: 2,
    ratio: "3 / 4",
  },

  // Linha 2 — 2 + 2 + 2
  {
    src: "/portfolio/02.jpg",
    alt: "Quarto com cortinado claro a filtrar a luz da janela",
    title: "Cortinado de quarto",
    location: "Suíte principal",
    span: 2,
    ratio: "3 / 4",
  },
  {
    src: "/portfolio/03.jpg",
    alt: "Sala de jantar com voile a toda a largura da parede envidraçada",
    title: "Voile a toda a largura",
    location: "Sala de jantar",
    span: 2,
    ratio: "3 / 4",
  },
  {
    src: "/portfolio/06.jpg",
    alt: "Sala de estar com cortinado a acompanhar a parede envidraçada",
    title: "Cortinado de sala",
    location: "Sala de estar",
    span: 2,
    ratio: "3 / 4",
  },

  // Linha 3 — 4 + 2
  {
    src: "/portfolio/05.jpg",
    alt: "Sala de estar com lareira e cortinado ondulado do teto ao chão a filtrar a luz",
    title: "Cortinado do teto ao chão",
    location: "Sala de estar",
    span: 4,
    ratio: "3 / 2",
  },
  {
    src: "/portfolio/08.jpg",
    alt: "Pormenor das ondas regulares de um voile de linho em sistema ondulado",
    title: "Pormenor do sistema ondulado",
    location: "Voile de linho",
    span: 2,
    ratio: "3 / 4",
  },
];
