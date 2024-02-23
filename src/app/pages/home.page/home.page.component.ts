import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home.page',
  standalone: true,
  imports: [],
  templateUrl: './home.page.component.html',
  styleUrl: './home.page.component.scss'
})
export class HomePageComponent {
  router = inject(Router)

  @Input() prefix!: string;

  constructor() {
    // this.route.params.subscribe(params => {
    //   // this.prefix = params['prefix'];
    // });
  }

  ngOnInit() {
    if (this.prefix != (null || 'ar' || 'en')) {
      // naviate to 404
      this.router.navigateByUrl('/not-found')
    }
    console.log('HomePageComponent: ' + this.prefix);
  }
}
