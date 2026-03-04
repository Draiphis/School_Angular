// Type metier: structure d'un jeu dans le catalogue WishFlix.
export type Game = {
  id: number;
  title: string;
  genre: string;
  category: string;
  year: number;
  platform: string;
  rating: number;
  synopsis: string;
  available: boolean;
  img: string;
};
