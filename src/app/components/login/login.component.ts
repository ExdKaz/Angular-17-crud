import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  submitted = false;
  isRegistered = signal(false);
  isLoggedIn = signal(false);
  isLoginVisible: boolean = false;
  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.isRegistered = this.sharedService.isRegistered;
    this.isLoggedIn = this.sharedService.isLoggedIn;
  }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onCancel() {
    this.loginForm.reset();
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.service.loginUser(this.loginForm.value).subscribe({
        next: (response: any) => {
          let loginedUser = response[0];
          if (this.loginForm.value.email === loginedUser.email) {
            let details: any = {
              userName: this.loginForm.value.email,
              password: this.loginForm.value.password,
              role: loginedUser.role,
              profileName: `${loginedUser.firstName.charAt(0).toUpperCase() + loginedUser.firstName.slice(1).toLowerCase()} ${loginedUser.lastName.charAt(0).toUpperCase() + loginedUser.lastName.slice(1).toLowerCase()}`

            }
            this.isLoginVisible = false;
            sessionStorage.setItem('userInfo', JSON.stringify(details));
            sessionStorage.setItem('authenticated', JSON.stringify('true'));
            this.sharedService.isLoggedIn.set(true);
            this.sharedService.isRegistered.set(true);
            this.router.navigateByUrl('/')
          } else {
            alert('User is not registered.')
          }
        },
        error: () => {
          alert('Error while Logging in');
        }
      })
    }
  }

  register() {
    this.sharedService.isLoggedIn.set(false);
    this.sharedService.isRegistered.set(false);
    this.router.navigateByUrl('/register');
  }

  dashboard() {
    this.router.navigateByUrl('/');
  }

}
