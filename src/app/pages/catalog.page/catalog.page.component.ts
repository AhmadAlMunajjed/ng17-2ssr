import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog.page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './catalog.page.component.html',
  styleUrl: './catalog.page.component.scss'
})
export class CatalogPageComponent {
  @Input() prefix!: string;
  
  ngOnInit() {
    console.log('CatalogPageComponent: ' + this.prefix);
  }
}
