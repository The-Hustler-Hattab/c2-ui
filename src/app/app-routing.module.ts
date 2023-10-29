import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LogComponent } from './components/pawned-log/log.component';
import { ConsoleComponent } from './components/console/console.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"",redirectTo: "home", pathMatch: 'full'},
  {path:"logs", component: LogComponent},
  {path:"about", component: AboutComponent},
  {path:"s3-files", component: AboutComponent},
  {path:"console", component: ConsoleComponent},
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: 'error', component: ErrorComponent},

  { path: '**', redirectTo:'page-not-found'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
