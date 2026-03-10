import { Component, input, output } from '@angular/core';
import { Game } from './game.model';
import { NgOptimizedImage } from '@angular/common';
import { FlixButton } from '../layout/flix-button/flix-button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.template.html',
  imports: [NgOptimizedImage, FlixButton, RouterLink],
})
export class GameCard {
  game = input.required<Game>();
  favorite = output<number>();
  isFavorite = input<boolean>(false);

  get wishlistLabel(): string {
    const verb: 'retirer de ' | 'Ajouter à ' = this.isFavorite() ? 'retirer de ' : 'Ajouter à ';
    return `${verb} la Wishlist`;
  }
}
