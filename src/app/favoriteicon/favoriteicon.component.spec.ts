import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteiconComponent } from './favoriteicon.component';

describe('FavoriteiconComponent', () => {
  let component: FavoriteiconComponent;
  let fixture: ComponentFixture<FavoriteiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
