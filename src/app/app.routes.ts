import { Routes } from '@angular/router';
import { prefixGuard } from './shared/guards';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home.page/home.page.component').then((m) => m.HomePageComponent),
    },
    {
        path: 'catalog',
        loadComponent: () => import('./pages/catalog.page/catalog.page.component').then((m) => m.CatalogPageComponent),
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart.page/cart.page.component').then((m) => m.CartPageComponent),
    },
    // prefix routes
    {
        path: ':prefix',
        loadComponent: () => import('./pages/home.page/home.page.component').then((m) => m.HomePageComponent),
        canMatch: [prefixGuard]
    },
    {
        path: ':prefix/catalog',
        loadComponent: () => import('./pages/catalog.page/catalog.page.component').then((m) => m.CatalogPageComponent),
        canMatch: [prefixGuard]
    },
    {
        path: ':prefix/cart',
        loadComponent: () => import('./pages/cart.page/cart.page.component').then((m) => m.CartPageComponent),
        canMatch: [prefixGuard]
    },
    /**
     * should be last
     */
    
    // 404
    {
        path: '**',
        loadComponent: () => import('./pages/not-found.page/not-found.page.component').then((m) => m.NotFoundPageComponent),
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    }
];
