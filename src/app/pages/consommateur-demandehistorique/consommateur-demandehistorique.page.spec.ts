import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsommateurDemandehistoriquePage } from './consommateur-demandehistorique.page';

describe('ConsommateurDemandehistoriquePage', () => {
  let component: ConsommateurDemandehistoriquePage;
  let fixture: ComponentFixture<ConsommateurDemandehistoriquePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsommateurDemandehistoriquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsommateurDemandehistoriquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
