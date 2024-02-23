import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home.page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {
  @Input() prefix!: string;

  constructor() {
  }

  ngOnInit() {
    console.log('HomePageComponent: ' + this.prefix);
  }
}
