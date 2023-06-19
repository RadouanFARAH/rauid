import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendeur-demandehistorique',
  templateUrl: './vendeur-demandehistorique.page.html',
  styleUrls: ['./vendeur-demandehistorique.page.scss'],
})
export class VendeurDemandehistoriquePage implements OnInit {

  data = [
    {
      numComande: 1205,
      dateCommande: "2021-08-03",
      etatDemande: "V"
    },
    {
      numComande: 2205,
      dateCommande: "2021-08-10",
      etatDemande: "V"
    },
    {
      numComande: 0,
      dateCommande: "2021-08-17",
      etatDemande: "R"
    },
    {
      numComande: 9205,
      dateCommande: "2021-08-24",
      etatDemande: "V"
    }, {
      numComande: 0,
      dateCommande: "2021-09-01",
      etatDemande: "R"
    },
    {
      numComande: 12105,
      dateCommande: "2021-09-08",
      etatDemande: "V"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
