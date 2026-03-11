import { Component, computed, inject, Inject } from '@angular/core';
import { GameCatalog } from '../../features/game/game-catalog';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../game/game.model';
import { FlixButton } from '../../layout/flix-button/flix-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'game-detail',
  imports: [FlixButton, RouterLink],
  templateUrl: './game-detail.html',
  styleUrl: './game-detail.css',
})
export class GameDetail {
  protected route = inject(ActivatedRoute);
  protected catalog = inject(GameCatalog);

  private readonly gameId = this.route.snapshot.paramMap.get('id') ?? '';

  protected game = computed<Game | undefined>(() =>
    this.catalog.getGameSheet(parseInt(this.gameId)),
  );
}
