import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isRegistered = signal(false);

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private sharedService: SharedService) { }

  registrationForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['user', Validators.required]
  });

  onCancel() {
    this.registrationForm.reset();
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.service.registerUser(this.registrationForm.value).subscribe({
        next: () => {
          alert('Registration successful');
          const formValue = this.registrationForm.value;
          let details: any = {
            userName: formValue.email ?? '',
            password: formValue.password ?? '',
            role: formValue.role ?? 'user',
            profileName: `${(formValue.firstName?.charAt(0).toUpperCase() ?? '') + (formValue.firstName?.slice(1).toLowerCase() ?? '')} ${(formValue.lastName?.charAt(0).toUpperCase() ?? '') + (formValue.lastName?.slice(1).toLowerCase() ?? '')}`

          }
          sessionStorage.setItem('userInfo', JSON.stringify(details));
          sessionStorage.setItem('authenticated', JSON.stringify('true'));
          this.isRegistered.set(true);
          this.sharedService.isLoggedIn.set(true);
          this.sharedService.isRegistered.set(true);
          this.router.navigateByUrl('/')
        },
        error: () => {
          alert('Error while Registering');
        }
      })
    }
  }
}
