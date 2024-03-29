import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ConsoleComponent } from './components/console/console.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LogComponent } from './components/pawned-log/log.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkDragHandle, DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {NgIf, JsonPipe, NgFor, DatePipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorComponent } from './components/error/error.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LogTableService } from './services/log/log-table.service';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthRoutingModule } from './auth-routing.module';
import { S3FilesComponent } from './components/s3-files/s3-files.component';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FolderComponent } from './components/s3-files/folder/folder.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FoldersComponent } from './components/s3-files/folders/folders.component';
import { FileComponent } from './components/s3-files/file/file.component';
import { TerminalModule } from 'primeng/terminal';
import {ToastModule} from 'primeng/toast';
import { FooterComponent } from './components/footer/footer.component';
import { PassFilesComponent } from './components/pawned-log/pass-files/pass-files.component';
import { SessionLogsComponent } from './components/pawned-log/session-logs/session-logs.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EmailSpammerComponent } from './components/email-spammer/email-spammer.component';
import { EmailFormsComponent } from './components/email-spammer/email-forms/email-forms.component';
import { EmailTablesComponent } from './components/email-spammer/email-tables/email-tables.component';
import { CreateEmailComponent } from './components/email-spammer/email-forms/create-email/create-email.component';
import { SendEmailComponent } from './components/email-spammer/email-forms/send-email/send-email.component';
import { SendSmsComponent } from './components/email-spammer/email-forms/send-sms/send-sms.component';
import { ResultBoxComponent } from './components/result-box/result-box.component';
import { EmailSmtpTableComponent } from './components/email-spammer/email-tables/email-smtp-table/email-smtp-table.component';
import { SmsCarrierTableComponent } from './components/email-spammer/email-tables/sms-carrier-table/sms-carrier-table.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    HomeComponent,
    ConsoleComponent,
    LogComponent,
    PageNotFoundComponent,
    ErrorComponent,
    LoadingSpinnerComponent,
    S3FilesComponent,
    FolderComponent,
    FoldersComponent,
    FileComponent,
    FooterComponent,
    PassFilesComponent,
    SessionLogsComponent,
    EmailSpammerComponent,
    EmailFormsComponent,
    EmailTablesComponent,
    CreateEmailComponent,
    SendEmailComponent,
    SendSmsComponent,
    ResultBoxComponent,
    EmailSmtpTableComponent,
    SmsCarrierTableComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    A11yModule,
    CdkTableModule,
    DragDropModule,
    CdkDragHandle,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    NgFor,
    MatButtonModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AuthRoutingModule,
    MatListModule,
    MatDividerModule,
    DatePipe,
    MatExpansionModule,
    TerminalModule,
    ToastModule,
    TableModule,
    ButtonModule,

    
    OAuthModule.forRoot(),

  ],
  providers: [LogTableService, DatePipe, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
