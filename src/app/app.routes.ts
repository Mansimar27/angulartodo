import { Routes } from '@angular/router';
import { BinComponent } from './components/bin/bin.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },

    { path: 'bin', component: BinComponent },
    { path: 'home', component: HomeComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'create', component: CreateComponent },

    { path: '**', pathMatch: 'full', redirectTo: '/home' },
];
