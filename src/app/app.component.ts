import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from './services/authorization.service';
import { RabbitMQService } from './services/rabbit-mq.service';
import { TokenStorageService } from './services/token-storage.service';

const DARK_MODE_CLASS_NAME = 'darkMode';
const THEME_MODE = 'DARK_MODE';
const LANGUAGE_NAME = 'language';

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
  tokenExpirationDate:Date;
  loggedOutSuccessfully:boolean = false;
  selectedLanguage:any = "english";

  constructor(@Inject(DOCUMENT) private document: Document,
  private overlayContainer: OverlayContainer,
    private tokenStorageService:TokenStorageService,
    private authService:AuthorizationService,
    private toastr:ToastrService,
    private router:Router,
    private rabbitMQService:RabbitMQService
    ) { }

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
    this.loadLanguage();
    this.initUserState();
    this.rabbitMQService.sendRequest("HomePage");
  }

  initUserState() : void {
    const user = this.tokenStorageService.getUser();
    if(user && user.username) {
      this.isLogged=true;
      this.tokenExpirationDate = user.expirationDate;
    }
  }

  logout() : void {
    this.authService.logout().subscribe(res => {
      this.loggedOutSuccessfully=true;
      setTimeout(() =>{
        this.tokenStorageService.signOut();
        this.loggedOutSuccessfully=false;
        this.document.location.href='/login';
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

  changeLanguage(value:string):void{
    this.selectedLanguage = value;
    window.sessionStorage.removeItem(LANGUAGE_NAME);
    window.sessionStorage.setItem(LANGUAGE_NAME, value);
  }

  loadLanguage():void{
    if(window.sessionStorage.getItem(LANGUAGE_NAME)!=null){
      this.selectedLanguage = window.sessionStorage.getItem(LANGUAGE_NAME);
    } else this.selectedLanguage='english';
  }

  isTokenExpired():boolean{
    if(this.tokenExpirationDate) return new Date(this.tokenExpirationDate).valueOf() <= new Date().valueOf();
    return true;
  }

  getLanguageIcon():string{
    switch(this.selectedLanguage){
      case 'english':
      default:
        return '/assets/flags/united-kingdom.png';
      case 'polish':
        return '/assets/flags/poland.png';
      case 'german':
        return '/assets/flags/germany.png';
      case 'spanish':
        return '/assets/flags/spain.png';
    }
  }

  isSelectedLanguage(value:string):boolean{
    return value===this.selectedLanguage;
  }
}
