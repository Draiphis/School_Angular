import { Injectable } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Game } from '../../game/game.model';
import { GameDatasource } from './game-datasource';

@Injectable({
  providedIn: 'root',
})
export class GameCatalog {
  [x: string]: any;
  readonly nomApplication = 'WishFlix';

  private readonly _dataSource = inject(GameDatasource);
  readonly _onlyAvailable = signal<boolean>(false);
  readonly onlyAvailable = this._onlyAvailable.asReadonly();
  _favoriteIds = signal<number[]>([]);
  readonly favoriteIds = this._favoriteIds.asReadonly();

  readonly games = signal<Game[]>([]);

  readonly availableGames = computed(() => {
    if (!this._onlyAvailable()) return this.games();
    return this.games().filter((game) => game.available);
  });

  readonly disponibleGames = computed(() => {
    return this.games().filter((game) => game.available);
  });

  loadGames(): void {
    this._dataSource.fetchAll()?.subscribe({
      next: (games) => {
        this.games.set(games);
      },
    });
  }

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

  getGameSheet(gameId: number): Game | undefined {
    return this.games().find((game) => game.id === gameId);
  }
}
