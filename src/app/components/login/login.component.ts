import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  isLoggedIn: boolean = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private sharedService: SharedService) { }

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
            this.isLoggedIn = true;
            let details: any = {
              userName: this.loginForm.value.email,
              password: this.loginForm.value.password,
              role: loginedUser.role
            }
            sessionStorage.setItem('userInfo', JSON.stringify(details));
            sessionStorage.setItem('authenticated', JSON.stringify('true'));
            alert('user successfully logged in');
            this.sharedService.isLoggedIn.set(true);
            this.sharedService.isRegistered.set(true);
            this.router.navigateByUrl('/')
          } else {
            alert('User is not registered.')
          }
        }
      })
    }
  }

}
