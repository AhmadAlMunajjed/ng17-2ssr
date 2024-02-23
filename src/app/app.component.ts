import { Component, Inject, Optional, afterNextRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import type { Context } from "@netlify/edge-functions"

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    @Inject('netlify.request') @Optional() request?: Request,
    @Inject('netlify.context') @Optional() context?: Context
  ) {
    console.log(`Rendering Foo for path ${request?.url} from location ${context?.geo?.city}`)

    afterNextRender(() => {

    });

  }

}
