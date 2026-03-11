import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../game/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameDatasource {
  private readonly http = inject(HttpClient);

  fetchAll(): Observable<Game[]> {
    return this.http.get<Game[]>('data/games.json');
  }
}
