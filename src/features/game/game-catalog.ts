import { Injectable } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Game } from '../../game/game.model';
import { GameDatasource } from './game-datasource';
import { delay } from 'rxjs';

type State = 'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS';

@Injectable({
  providedIn: 'root',
})
export class GameCatalog {
  [x: string]: any;
  readonly nomApplication = 'WishFlix';

  protected readonly _state = signal<State>('IDLE');

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
    this._state.set('LOADING');
    this._dataSource
      .fetchAll()
      .pipe(delay(2000))
      .subscribe({
        next: (games) => {
          this.games.set(games);
          this._state.set('SUCCESS');
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

  isState(state: State): boolean {
    return this._state() === state;
  }

  getGameSheet(gameId: number): Game | undefined {
    return this.games().find((game) => game.id === gameId);
  }
}
