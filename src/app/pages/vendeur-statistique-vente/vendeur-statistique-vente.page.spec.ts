import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendeurStatistiqueVentePage } from './vendeur-statistique-vente.page';

describe('VendeurStatistiqueVentePage', () => {
  let component: VendeurStatistiqueVentePage;
  let fixture: ComponentFixture<VendeurStatistiqueVentePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendeurStatistiqueVentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurStatistiqueVentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
