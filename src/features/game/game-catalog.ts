import { Injectable } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Game } from '../../game/game.model';

@Injectable({
  providedIn: 'root',
})
export class GameCatalog {
  readonly nomApplication = 'WishFlix';
  readonly _onlyAvailable = signal<boolean>(false);
  readonly onlyAvailable = this._onlyAvailable.asReadonly();
  _favoriteIds = signal<number[]>([]);
  readonly favoriteIds = this._favoriteIds.asReadonly();

  readonly games = signal<Game[]>([
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

  readonly availableGames = computed(() => {
    if (!this._onlyAvailable()) return this.games();
    return this.games().filter((game) => game.available);
  });

  readonly disponibleGames = computed(() => {
    return this.games().filter((game) => game.available);
  });

  filterByAvailability(): void {
    this._onlyAvailable.update((available) => !available);
  }

  toggleFavorite(gameId: number): void {
    this._favoriteIds.update((gameIds) => {
      if (!gameIds.includes(gameId)) {
        return [...gameIds, gameId];
      }
      return gameIds.filter((id) => id !== gameId);
    });
  }

  isFavorite(gameId: number): boolean {
    return this._favoriteIds().includes(gameId);
  }
}
