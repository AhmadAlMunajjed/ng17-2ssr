import { Component, ElementRef, Inject, Optional, ViewChild, afterNextRender } from '@angular/core';
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
  @ViewChild('content') contentRef!: ElementRef;

  title = 'ng17-2ssr';

  constructor(
    @Inject('netlify.request') @Optional() request?: Request,
    @Inject('netlify.context') @Optional() context?: Context
  ) {
    console.log(`Rendering Foo for path ${request?.url} from location ${context?.geo?.city}`)

    afterNextRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      console.log('content height: ' + this.contentRef.nativeElement.scrollHeight);
    });

  }

}
