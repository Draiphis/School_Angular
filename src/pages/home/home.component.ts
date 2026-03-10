import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Game } from '../../game/game.model';
import { GameCard } from '../../game/game-card';
import { NgOptimizedImage } from '@angular/common';
import { GameSection } from '../../layout/game-section/game-section';
import { FlixButton } from '../../layout/flix-button/flix-button';

@Component({
  selector: 'home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameCard, NgOptimizedImage, GameSection, FlixButton],
  templateUrl: './home.page.html',
  styleUrls: ['./home.css'],
})
export class Home {
  protected readonly nomApplication = 'WishFlix';
  protected readonly onlyAvailable = signal<boolean>(false);
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

  protected favoriteIds = signal<number[]>([]);

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

  protected toggleFavorite(gameId: number): void {
    this.favoriteIds.update((gameIds) => {
      if (!gameIds.includes(gameId)) {
        return [...gameIds, gameId];
      }
      return gameIds.filter((id) => id !== gameId);
    });
  }

  protected isFavorite(gameId: number): boolean {
    return this.favoriteIds().includes(gameId);
  }

  protected filterAvailabilityLabel(): string {
    if (this.onlyAvailable()) {
      return 'Voir tous les jeux';
    } else {
      return 'Voir uniquement les jeux disponibles';
    }
  }
}
