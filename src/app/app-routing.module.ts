import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogComponent } from './components/pawned-log/log.component';
import { ConsoleComponent } from './components/console/console.component';
import { ErrorComponent } from './components/error/error.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { S3FilesComponent } from './components/s3-files/s3-files.component';
import { SessionLogsComponent } from './components/pawned-log/session-logs/session-logs.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"",redirectTo: "home", pathMatch: 'full'},
  {path:"logs", component: LogComponent},
  {path:"about", component: AboutComponent},
  {path:"s3-files", component: S3FilesComponent},
  {path:"console", component: ConsoleComponent},
  {path:"session-logs", component: SessionLogsComponent},

  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'callback', component: OktaCallbackComponent},
  
  { path: '**', redirectTo:'page-not-found'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
