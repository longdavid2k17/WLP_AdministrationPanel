import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserEmulationInterceptor } from './interceptors/user-emulation.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceDiscoveryComponent } from './components/service_discovery/service-discovery/service-discovery.component';
import { ServiceDiscoveryWidgetComponent } from './components/service_discovery/service-discovery-widget/service-discovery-widget.component';
import { LogManagerComponent } from './components/log-manager/log-manager.component';
import { UserManagmentComponent } from './components/user-management/user-managment.component';
import { UserManagementPreviewComponent } from './components/user-management-preview/user-management-preview.component';
import { SendMailComponent } from './components/send-mail/send-mail.component';
import { MailingManagementComponent } from './components/mailing-management/mailing-management.component';
import { RolesManagmentComponent } from './components/roles-managment/roles-managment.component';
import { AccountDisableFormComponent } from './components/account-disable-form/account-disable-form.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { MessagePreviewComponent } from './components/message-preview/message-preview.component';
import { LogsManagmentComponent } from './components/logs-managment/logs-managment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ServiceDiscoveryComponent,
    ServiceDiscoveryWidgetComponent,
    LogManagerComponent,
    UserManagmentComponent,
    UserManagementPreviewComponent,
    SendMailComponent,
    MailingManagementComponent,
    RolesManagmentComponent,
    AccountDisableFormComponent,
    UserPreviewComponent,
    MessagePreviewComponent,
    LogsManagmentComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    CommonModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-top-right'
  }),
  FlexLayoutModule,
  ScrollingModule,
  DragDropModule,
  ],
  exports: [
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserEmulationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
