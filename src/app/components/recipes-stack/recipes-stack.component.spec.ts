import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesStackComponent } from './recipes-stack.component';

describe('RecipesStackComponent', () => {
  let component: RecipesStackComponent;
  let fixture: ComponentFixture<RecipesStackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesStackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
