
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ModalController, ToastController } from "@ionic/angular";
import { UserService } from 'src/app/services/user.service';
import { Storage } from '@ionic/storage-angular';
import jwtDecode from 'jwt-decode';
import { ForgotPasswordPage } from 'src/app/modals/forgot-password/forgot-password.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  dataForm: FormGroup;

  showPassword: boolean = false;
  passwordToggleIcon = "eye";
  showErrorAlerte: boolean = false;
  password: any = "";
  identifant: any = "";
  spinner: boolean;
  constructor(private modalController: ModalController, private toast: ToastController, private route: Router, private storage: Storage, private menu: MenuController, private userService: UserService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.dataForm = this.fb.group({
      id: [""],
      pwd: [""]
    })
  }
  togglePassword() {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  async login() {
    this.spinner = true
    let data = this.dataForm.value;
    this.userService.login(data).subscribe(async (res: any) => {
      this.spinner = false
      let decodedToken: any = jwtDecode(res.token)
        localStorage.setItem('token', res.token);
        await this.storage.set('token', res.token)
        await this.storage.set('username', res['name'])
        await this.storage.set('id', 1)
        await this.storage.set('id', decodedToken.id)
        await this.storage.set('role', res['role'])
        await this.userService.role.next(res['role'])
        await this.userService.name.next(res['name'])
      if (res.role == "C") {
        await this.storage.set('tokenC', res.token)
        this.route.navigate(["categories"])
      }
      else if (res.role == "V") {
        await this.storage.set('tokenV', res.token)
        await this.storage.set('hasBoss', res.hasBoss)
        await this.storage.set('ville', res.ville)
        await this.storage.set('ID_', res.id)
        this.route.navigate(["vendeur-home"])
      } else if (res.role == "R") {
        await this.storage.set('tokenR', res.token)
        this.route.navigate(["responsable-home"])
      } else if (res.role == "D") {
        await this.storage.set('tokenD', res.token)
        this.route.navigate(["directeur-home"])
      }
    }, 
    async (err) => {
      this.spinner = false
      const toast = await this.toast.create({
        message: 'حدث خطأ المرجو إعادة المحاولة',
        duration: 2000,
        position: 'middle',
        cssClass: "failedtoastclass"
      });
      toast.present();
    })
  }

  async changePassword() {

    const modal = await this.modalController.create({
      component: ForgotPasswordPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  reDo() {
    this.identifant = "";
    this.password = "";
    this.showErrorAlerte = false;
  }
}
