export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Conversa",
    description: "Ouvimos o que procura, o uso de cada divisão e o ambiente que quer criar.",
  },
  {
    number: "02",
    title: "Medição",
    description: "A visita é gratuita: deslocamo-nos a sua casa e medimos cada vão ao milímetro.",
  },
  {
    number: "03",
    title: "Tecidos",
    description: "Apresentamos amostras, forros e acabamentos, avaliados à luz do espaço.",
  },
  {
    number: "04",
    title: "Confeção",
    description: "Cada peça é cortada e cosida à mão no atelier, com acabamentos verificados um a um.",
  },
  {
    number: "05",
    title: "Instalação",
    description: "Colocamos, ajustamos o caimento e deixamos o ambiente pronto a viver.",
  },
];
