import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { onlyLoggedInGuard } from './shared/guards/only-logged-in.guard';
import { ClientComponent } from './pages/client/client.component';
import { ClientListComponent } from './pages/client-list/client-list.component';

const routes: Routes = [
  {
    path: 'user/sign-up',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/users/sign-up/sign-up.module').then(
        (m) => m.SignUpModule
      ),
  },
  {
    path: 'user/sign-in',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/users/sign-in/sign-in.module').then(
        (m) => m.SignInModule
      ),
  },
  {
    path: 'user/profile',
    canActivate: [onlyLoggedInGuard],
    loadChildren: () =>
      import('./pages/users/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'user/email-verification',
    loadChildren: () =>
      import('./pages/users/email-verification/email-verification.module').then(
        (m) => m.EmailVerificationModule
      ),
  },
  {
    path: 'user/forgot-password',
    loadChildren: () =>
      import('./pages/users/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  // { path: '', redirectTo: 'client-list', pathMatch: 'full' },
  { path: 'add-client', component: ClientComponent },
  { path: 'client-list', component: ClientListComponent },
  // { path: '**', redirectTo: 'client-list', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
