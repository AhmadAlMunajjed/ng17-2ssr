import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import createLiquidEngine from '../../shared/utils/createLiquidEngine';

@Component({
  selector: 'app-custom.page',
  standalone: true,
  imports: [],
  templateUrl: './custom.page.component.html',
  styleUrl: './custom.page.component.scss'
})
export class CustomPageComponent {
  @Input() prefix!: string;
  @Input() slug!: string;
  content!: string;
  http = inject(HttpClient);

  constructor(
    private meta: Meta,
    private title: Title,
    // private document: Document,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.meta.addTag({ name: 'description', content: 'Custom Page' });
    this.title.setTitle('Custom Page');
  }

  async ngOnInit() {
    const baseAssetsUrl = '/assets';
    const themeBaseUrl = `${baseAssetsUrl}/themes`;
    console.log('CustomPageComponent: ' + this.prefix);
    const theme = 'theme1';
    const themeUrl = `${themeBaseUrl}/${theme}`;
    const lang = this.prefix ?? 'en';
    const locale = await this.http.get(`${themeBaseUrl}/${theme}/locales/${lang}.json`).toPromise();
    this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.document.documentElement.lang = lang;
    const page = 'home';

    const engine = createLiquidEngine({
      themeBaseUrl: themeBaseUrl,
      themeName: theme
    });

    const appData: any = {
      id: 'app1-2'
    };

    const layoutData = {
      THEME_BASE_URL: themeUrl,
      baseAssetsUrl: baseAssetsUrl,
      data: {
        plugins: [],
        app: appData
      }
    };

    const pageData = {
      site_name: `${this.slug} page works from ${this.prefix}!`,
      data: {
        plugins: [],
        app: appData
      }
    };

    const pageTemplate = await engine.renderFile('templates/' + page, {
      ...pageData, ...locale
    });
    const layoutTemplate = await engine.renderFile('layouts/main-layout', {
      ...layoutData, ...locale, content: pageTemplate
    });
    this.content = layoutTemplate;
    console.log(layoutTemplate);
  }
}
