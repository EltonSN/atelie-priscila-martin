import type { IconName } from "@/components/ui/Icon";

export type Service = {
  icon: IconName;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: "curtain",
    title: "Cortinados por medida",
    description:
      "Cortinas, sanefas e reposteiros confecionados peça a peça, com o caimento estudado para cada vão e para a luz de cada divisão.",
  },
  {
    icon: "blind",
    title: "Estores e sistemas",
    description:
      "Estores de rolo, romanos e painéis japoneses, calhas embutidas e motorização discreta, integrados na arquitetura do espaço.",
  },
  {
    icon: "fabric",
    title: "Consultoria de tecidos",
    description:
      "Seleção de tecidos, forros e acabamentos com amostras apresentadas na sua casa, à luz real do ambiente.",
  },
];
