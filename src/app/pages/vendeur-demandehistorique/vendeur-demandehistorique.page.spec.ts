import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendeurDemandehistoriquePage } from './vendeur-demandehistorique.page';

describe('VendeurDemandehistoriquePage', () => {
  let component: VendeurDemandehistoriquePage;
  let fixture: ComponentFixture<VendeurDemandehistoriquePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendeurDemandehistoriquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurDemandehistoriquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
