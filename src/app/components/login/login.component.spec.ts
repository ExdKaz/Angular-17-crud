// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Injectable()
class MockUserService {
  loginUser() { }
}

@Injectable()
class MockRouter {
  navigate() { }
  navigateAll() { }
  navigateByUrl() { }
}

@Injectable()
class MockSharedService {

}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('LoginComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: SharedService, useClass: MockSharedService }
      ]
    }).overrideComponent(LoginComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () { };
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.sharedService = component.sharedService || { reset() { } };
    component.sharedService.isRegistered = 'isRegistered';
    component.sharedService.isLoggedIn = 'isLoggedIn';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should run #onCancel()', async () => {
    component.loginForm = component.loginForm || {};
    spyOn(component.loginForm, 'reset');
    component.onCancel();
    expect(component).toBeTruthy();
  });

  it('should run #onSubmit()', async () => {
    component.loginForm = component.loginForm || { reset() { } };
    component.loginForm = {
      value: {
        email: {},
        password: {}
      },
      valid: true
    };
    component.service = component.service || { reset() { } };
    spyOn(component.service, 'loginUser').and.returnValue(observableOf({}));
    component.sharedService = component.sharedService || { reset() { } };
    component.sharedService.isLoggedIn = {
      set: function () { }
    };
    component.sharedService.isRegistered = {
      set: function () { }
    };
    component.router = component.router || { reset() { } };
    spyOn(component.router, 'navigateByUrl');
    component.onSubmit();
    expect(component).toBeTruthy();

  });

  it('should run #register()', async () => {
    component.sharedService = component.sharedService || { reset() { } };
    component.sharedService.isLoggedIn = {
      set: function () { }
    };
    component.sharedService.isRegistered = {
      set: function () { }
    };
    component.router = component.router || { reset() { } };
    spyOn(component.router, 'navigateByUrl');
    component.register();
    expect(component).toBeTruthy();
  });

  it('should run #dashboard()', async () => {
    component.router = component.router || { reset() { } };
    spyOn(component.router, 'navigateByUrl');
    component.dashboard();
    expect(component).toBeTruthy();
  });

});