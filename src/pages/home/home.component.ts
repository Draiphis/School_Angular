import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Inject,
  inject,
  signal,
} from '@angular/core';
import { Game } from '../../game/game.model';
import { GameCard } from '../../game/game-card';
import { NgOptimizedImage } from '@angular/common';
import { GameSection } from '../../layout/game-section/game-section';
import { FlixButton } from '../../layout/flix-button/flix-button';
import { GameCatalog } from '../../features/game/game-catalog';

@Component({
  selector: 'home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameCard, NgOptimizedImage, GameSection, FlixButton],
  templateUrl: './home.page.html',
  styleUrls: ['./home.css'],
})
export class Home {
  protected readonly catalog = inject(GameCatalog);

  protected filterAvailabilityLabel(): string {
    if (this.catalog.onlyAvailable()) {
      return 'Voir tous les jeux';
    } else {
      return 'Voir uniquement les jeux disponibles';
    }
  }
}
