import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

export const routes: Routes = [
        { path: '', component: SidebarComponent, pathMatch: 'full' },

];
