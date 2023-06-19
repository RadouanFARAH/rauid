import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { VilleQuartierService } from 'src/app/services/ville-quartier.service';

@Component({
  selector: 'app-logcity',
  templateUrl: './logcity.page.html',
  styleUrls: ['./logcity.page.scss'],
})
export class LogcityPage implements OnInit {

  data: any = []

  constructor(private V_Q_service: VilleQuartierService, private userService: UserService) {

  }

  ngOnInit() {
    console.log("did");
    
    this.V_Q_service.getVilles().subscribe(res => {
      this.data = res;
    })
  }

}
