import type { ImageSourcePropType } from "react-native";

const LUNA = require("../assets/luna.jpg");
const NINO = require("../assets/nino.jpg");
const AMORA = require("../assets/amora.jpg");
const SIMBA = require("../assets/simba.jpg");
const MEL = require("../assets/mel.jpg");
const THEO = require("../assets/theo.jpg");

export type Cat = {
  id: string;
  name: string;
  sex: string;
  age: string;
  location: string;
  image: ImageSourcePropType;
  photos: ImageSourcePropType[];
  description: string;
  health: string[]; 
  personality: string[]; 
  environment: "Apartamento" | "Casa com pátio" | "Indiferente";
  compatibility: string[]; 
};

export const cats: Cat[] = [
  {
    id: "1",
    name: "Luna",
    sex: "Fêmea",
    age: "4 meses",
    location: "Caxias do Sul · RS",
    image: LUNA,
    photos: [LUNA],
    description:
      "A Luna é uma gatinha muito carinhosa, brincalhona e adora companhia. Foi resgatada pela ONG Patas do Bem e está pronta para encontrar uma família cheia de amor!",
    health: ["Castrado", "Vacinado"],
    personality: ["Carinhoso", "Brincalhão", "Sociável"],
    environment: "Apartamento",
    compatibility: ["Outros gatos"],
  },
  {
    id: "2",
    name: "Nino",
    sex: "Macho",
    age: "1 ano",
    location: "Caxias do Sul · RS",
    image: NINO,
    photos: [NINO],
    description:
      "O Nino é um gatinho independente e muito esperto. Gosta de observar a rua pela janela e de brincar com bolinhas. Foi resgatado pela ONG Quatro Patas e procura um lar tranquilo.",
    health: ["Castrado", "Vacinado", "Vermifugado"],
    personality: ["Independente", "Calmo", "Carinhoso"],
    environment: "Casa com pátio",
    compatibility: ["Crianças"],
  },
  {
    id: "3",
    name: "Amora",
    sex: "Fêmea",
    age: "2 anos",
    location: "Farroupilha · RS",
    image: AMORA,
    photos: [AMORA],
    description:
      "A Amora é uma gata doce e tranquila, daquelas que ronronam no colo por horas. Cuidada pela ONG Miau Amigo, ela sonha com um sofá só dela.",
    health: ["Castrado", "Vacinado"],
    personality: ["Calmo", "Carinhoso", "Independente"],
    environment: "Apartamento",
    compatibility: ["Outros gatos", "Cachorros"],
  },
  {
    id: "4",
    name: "Simba",
    sex: "Macho",
    age: "8 meses",
    location: "Caxias do Sul · RS",
    image: SIMBA,
    photos: [SIMBA],
    description:
      "O Simba tem energia de sobra e vive atrás de qualquer coisa que se mexa. Resgatado pela ONG Lar dos Bigodes, procura uma família que goste de brincar.",
    health: ["Vacinado", "Vermifugado"],
    personality: ["Brincalhão", "Sociável", "Carinhoso"],
    environment: "Casa com pátio",
    compatibility: ["Outros gatos", "Cachorros", "Crianças"],
  },
  {
    id: "5",
    name: "Mel",
    sex: "Fêmea",
    age: "1 ano",
    location: "Bento Gonçalves · RS",
    image: MEL,
    photos: [MEL],
    description:
      "A Mel é sociável e adora conhecer gente nova. Chegou à ONG Gatinhos da Serra ainda pequena e hoje está pronta para ganhar um lar definitivo.",
    health: ["Castrado", "Vacinado", "Vermifugado"],
    personality: ["Sociável", "Carinhoso", "Calmo"],
    environment: "Indiferente",
    compatibility: ["Crianças"],
  },
  {
    id: "6",
    name: "Theo",
    sex: "Macho",
    age: "6 meses",
    location: "Caxias do Sul · RS",
    image: THEO,
    photos: [THEO],
    description:
      "O Theo é curioso e gosta de explorar cada cantinho da casa. Foi resgatado pela ONG Patas do Bem e quer encontrar alguém para chamar de seu.",
    health: ["Vacinado"],
    personality: ["Brincalhão", "Independente", "Sociável"],
    environment: "Apartamento",
    compatibility: [],
  },
];