import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLogged:boolean = false;
  loggedSuccessfully:boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document,
  private tokenStorageService:TokenStorageService,
    private fb: FormBuilder,
    private authService: AuthorizationService,
    private toastr:ToastrService,
    private router:Router) {
      this.form = this.fb.group({
        username: [null, [Validators.required, Validators.minLength(3)]],
        password: [null, [Validators.required, Validators.minLength(3)]],
      });
     }

  ngOnInit(): void {
    this.initUserState();
  }

  initUserState() : void {
    const user = this.tokenStorageService.getUser();
    if(user && user.username) this.isLogged=true;
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    this.authService.logUser(this.form.value).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);
        this.loggedSuccessfully=true;
        this.toastr.success("You will be redirected soon","Success");
        setTimeout(() =>{
          this.document.location.href = '/home';
        },2000);
      },
      err => {
        this.toastr.error(err.error.message,'Error!');
      }
    );
  }
}
