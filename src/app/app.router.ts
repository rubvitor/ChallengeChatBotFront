import { Routes, RouterModule } from '@angular/router';
import { ChatDialogComponent } from './chat/chat-dialog/chat-dialog.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
    { path: '', component: ChatDialogComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });