import { Component, input } from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'outiline';
type ButtonsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'flix-button',
  imports: [],
  templateUrl: './flix-button.html',
  styleUrl: './flix-button.css',
})
export class FlixButton {
  role = input<ButtonType>();
  size = input<ButtonsSize>();

  get classes(): Array<string> {
    const classes = [];

    if (this.role()) classes.push(`btn-${this.role()}`);
    if (this.size()) classes.push(`btn-${this.size()}`);
    return classes;
  }
}
