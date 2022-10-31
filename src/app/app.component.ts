import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from './services/authorization.service';
import { TokenStorageService } from './services/token-storage.service';

const DARK_MODE_CLASS_NAME = 'darkMode';
const THEME_MODE = 'DARK_MODE';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  
  title = 'wlp_administration_view';
  isLogged:boolean = false;
  loggedOutSuccessfully:boolean = false;

  constructor(private overlayContainer: OverlayContainer,
    private tokenStorageService:TokenStorageService,
    private authService:AuthorizationService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? DARK_MODE_CLASS_NAME : '';
      if (darkMode) {
        this.overlayContainer.getContainerElement().classList.add(DARK_MODE_CLASS_NAME);
        this.setThemeMode(true);
      } else {
        this.overlayContainer.getContainerElement().classList.remove(DARK_MODE_CLASS_NAME);
        this.setThemeMode(false);
      }
    });
    this.loadThemeMode();
    this.initUserState();
  }

  initUserState() : void {
    const user = this.tokenStorageService.getUser();
    if(user && user.username) this.isLogged=true;
  }

  logout() : void {
    this.authService.logout().subscribe(res => {
      this.loggedOutSuccessfully=true;
      setTimeout(() =>{
        this.tokenStorageService.signOut();
        this.loggedOutSuccessfully=false;
        this.router.navigate(['/login']);
      },2000);
    },
    error => {
      this.toastr.error(error.error.message,'Error!');
    });
  }

  loadThemeMode() : void {
    const value = window.sessionStorage.getItem(THEME_MODE);
    if(value && value=='true'){
      this.overlayContainer.getContainerElement().classList.add(DARK_MODE_CLASS_NAME);
      this.toggleControl.setValue(true);
    } else {
      this.overlayContainer.getContainerElement().classList.remove(DARK_MODE_CLASS_NAME);
      this.toggleControl.setValue(false);
    }
  }

  setThemeMode(value:boolean) : void {
    window.sessionStorage.removeItem(THEME_MODE);
    if(value){
      window.sessionStorage.setItem(THEME_MODE, JSON.stringify(true));
    }
    else window.sessionStorage.setItem(THEME_MODE, JSON.stringify(false));
  }
}
