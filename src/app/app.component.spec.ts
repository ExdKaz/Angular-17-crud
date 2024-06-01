// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Router } from '@angular/router';


@Injectable()
class MockRouter {
  navigate() { }; navigateAll() { };
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

describe('AppComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        AppComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [

        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(AppComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function () { };
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #logout()', async () => {
    sessionStorage.setItem('authenticated', JSON.stringify('true'));
    sessionStorage.setItem('userInfo', JSON.stringify({}));
    component.logout();
    expect(component).toBeTruthy();
  });

  it('should run #ngDoCheck()', async () => {
    sessionStorage.setItem('authenticated', JSON.stringify('true'));
    sessionStorage.setItem('userInfo', JSON.stringify({}));
    component.router = component.router || {};
    component.router.url = '/login'
    component.ngDoCheck();
    expect(component).toBeTruthy();
  });

  it('should run #ngDoCheck() ss null', async () => {
    sessionStorage.removeItem('userInfo');
    component.ngDoCheck();
    expect(component).toBeTruthy();
  });
});