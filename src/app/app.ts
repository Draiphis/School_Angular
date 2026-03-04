import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

// Type metier: structure d'un jeu dans le catalogue WishFlix.

type Game = {
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

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  templateUrl: './app.template.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly nomApplication = 'WishFlix';
  protected readonly onlyAvailable = signal(false);
  protected readonly games = signal<Game[]>([
    {
      id: 1,
      title: 'cékacé',
      genre: 'RPG',
      category: 'Nouveautes',
      year: 2023,
      platform: 'PC, PS5, Xbox',
      rating: 4.5,
      synopsis: 'Un RPG futuriste dans un monde cyberpunk.',
      available: true,
      img: 'https://via.assets.so/game.png?id=1&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 2,
      title: 'Stellar Odyssey',
      genre: 'Aventure',
      category: 'Nouveautes',
      year: 2023,
      platform: 'PC, PS5',
      rating: 4.8,
      synopsis: 'Une aventure spatiale epique.',
      available: true,
      img: 'https://via.assets.so/game.png?id=6&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 3,
      title: 'Shadow Legends',
      genre: 'Action',
      category: 'Populaires',
      year: 2022,
      platform: 'PC, Xbox',
      rating: 4.2,
      synopsis: 'Combattez les forces des tenebres.',
      available: false,
      img: 'https://via.assets.so/game.png?id=5&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 4,
      title: 'Racing Thunder',
      genre: 'Course',
      category: 'Populaires',
      year: 2022,
      platform: 'PS5, Xbox',
      rating: 4.0,
      synopsis: 'Des courses a couper le souffle.',
      available: true,
      img: 'https://via.assets.so/game.png?id=4&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 5,
      title: 'Fantasy Kingdom',
      genre: 'RPG',
      category: 'Classiques',
      year: 2020,
      platform: 'PC',
      rating: 4.7,
      synopsis: 'Un monde fantastique vous attend.',
      available: true,
      img: 'https://via.assets.so/game.png?id=3&q=95&w=300&h=450&fit=cover',
    },
    {
      id: 6,
      title: 'Zombie Survival',
      genre: 'Horreur',
      category: 'Classiques',
      year: 2021,
      platform: 'PC, PS5, Xbox',
      rating: 3.9,
      synopsis: 'Survivez a l apocalypse zombie.',
      available: false,
      img: 'https://via.assets.so/game.png?id=2&q=95&w=300&h=450&fit=cover',
    },
  ]);

  protected readonly availableGames = computed(() => {
    if (!this.onlyAvailable()) return this.games();
    return this.games().filter((game) => game.available);
  });

  protected readonly disponibleGames = computed(() => {
    return this.games().filter((game) => game.available);
  });

  protected filterByAvailability(): void {
    this.onlyAvailable.update((available) => !available);
  }
  protected filterAvailabilityLabel = computed((): string => {
    if (this.onlyAvailable()) {
      return 'Voir tous les jeux';
    } else {
      return 'Voir uniquement les jeux disponibles';
    }
  });
}

// Signal principal: source de verite locale de la liste de jeux.
