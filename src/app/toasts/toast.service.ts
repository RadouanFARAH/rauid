import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl:ToastController) { }
  async presentSuccessToast(message,duration) {
    let text = message?message:'تمت العملية بنجاح'
    const toast = await this.toastCtrl.create({
      message:text,
      duration,
      position: 'middle',
      cssClass: "successtoastclass"
    });
    toast.present();
  }
  async presentErrorToast(message, duration) {
    let text = message?message:'حدث خطأ ما ، يرجى المحاولة مرة أخرى لاحقًا'
    const toast = await this.toastCtrl.create({
      message:text,
      duration:2000,
      position: 'middle',
      cssClass: "failedtoastclass"
    });
    toast.present();
  }
}
