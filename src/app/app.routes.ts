import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotpassowrdComponent } from './components/forgotpassowrd/forgotpassowrd.component';
import { RestartPassowrdComponent } from './components/restart-passowrd/restart-passowrd.component';
import { MessageComponent } from './components/message/message.component';

export const routes: Routes = [
        { path: '', component: LoginComponent, pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'forgot', component: ForgotpassowrdComponent },
        { path: 'recover/:token', component: RestartPassowrdComponent },
        { path: 'message', component: MessageComponent },
        { path: 'admin', component: SidebarComponent },

];
