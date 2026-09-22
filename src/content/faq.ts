export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "O que é preciso para receber um orçamento?",
    answer:
      "Basta enviar-nos a localidade e a largura das paredes. Com esses dois dados avançamos com uma primeira proposta, sem compromisso.",
  },
  {
    question: "A visita tem custos?",
    answer:
      "Não. A visita é gratuita e sem compromisso — só avançamos depois de estar tudo acordado consigo.",
  },
  {
    question: "Fazem medições ao domicílio?",
    answer:
      "Sim. A medição é sempre feita por nós, na sua casa, porque um erro de poucos milímetros compromete o caimento de toda a peça. A deslocação é combinada previamente por WhatsApp.",
  },
  {
    question: "Qual é o prazo de instalação?",
    answer:
      "Cerca de quatro semanas. O prazo conta a partir da aprovação do orçamento e da confirmação do tecido, e a data de instalação é combinada consigo com antecedência.",
  },
];
