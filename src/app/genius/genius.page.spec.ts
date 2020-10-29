import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeniusPage } from './genius.page';

describe('GeniusPage', () => {
  let component: GeniusPage;
  let fixture: ComponentFixture<GeniusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeniusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeniusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
