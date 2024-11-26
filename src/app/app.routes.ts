import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotpassowrdComponent } from './components/forgotpassowrd/forgotpassowrd.component';
import { RestartPassowrdComponent } from './components/restart-passowrd/restart-passowrd.component';
import { MessageComponent } from './components/message/message.component';
import { CreateProjectComponent } from './components/projects/create-project/create-project.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndexProjectComponent } from './components/projects/index-project/index-project.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotpassowrdComponent },
  { path: 'recover/:token', component: RestartPassowrdComponent },
  { path: 'message', component: MessageComponent },
  {
    path: 'admin', component: DashboardComponent,
    children: [
      { path: 'index-project', component: IndexProjectComponent },
      { path: 'create-project', component: CreateProjectComponent }
    ]
  }


];
