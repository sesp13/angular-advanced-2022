import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It should have a link to doctors page', () => {
    // Get all elements with a router link with href directive!
    const elements = fixture.debugElement.queryAll(
      By.directive(RouterLinkWithHref)
    );

    let exists = false;

    for (const elem of elements) {
      if (elem.attributes['routerLink'] === '/doctors') {
        exists = true;
        break;
      }
    }

    expect(exists).toBeTruthy();
  });
});
