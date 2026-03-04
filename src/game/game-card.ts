import { Component, input } from '@angular/core';
import { Game } from './game.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.template.html',
  imports: [NgOptimizedImage],
})
export class GameCard {
  game = input.required<Game>();
}
