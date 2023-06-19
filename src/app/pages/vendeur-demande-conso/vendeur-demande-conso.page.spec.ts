import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendeurDemandeConsoPage } from './vendeur-demande-conso.page';

describe('VendeurDemandeConsoPage', () => {
  let component: VendeurDemandeConsoPage;
  let fixture: ComponentFixture<VendeurDemandeConsoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VendeurDemandeConsoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendeurDemandeConsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
