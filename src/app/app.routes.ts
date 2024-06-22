import { Routes } from '@angular/router';
import { BinComponent } from './components/bin/bin.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },

    { path: 'home', component: HomeComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit', component: CreateComponent },
    { path: 'bin', component: BinComponent },

    { path: '**', pathMatch: 'full', redirectTo: '/home' },
];
