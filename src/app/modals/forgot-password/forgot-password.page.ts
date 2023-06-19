import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { PasswordService } from 'src/app/services/password.service';
import { ToastService } from 'src/app/toasts/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  dataForm: FormGroup;
  showPassword: boolean;
  passwordToggleIcon = "eye";
  nomMessage: string;
  isHidden: boolean;
  showrePassword: any;
  repasswordToggleIcon: string="eye";
  constructor(private toastService: ToastService, private passwordService: PasswordService, private alertIonic: AlertController, private modalController: ModalController, private fb: FormBuilder) { }
  ngOnInit() {
    this.dataForm = this.fb.group({
      id: ["", Validators.required],
      pwd: ["", Validators.required],
      repwd: ["", Validators.required]
    })
  }
  togglerePassword() {
    this.showrePassword = !this.showrePassword;

    if (this.repasswordToggleIcon == "eye") {
      this.repasswordToggleIcon = "eye-off";
    } else {
      this.repasswordToggleIcon = "eye";
    }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;

    if (this.passwordToggleIcon == "eye") {
      this.passwordToggleIcon = "eye-off";
    } else {
      this.passwordToggleIcon = "eye";
    }
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async triggerForgotPassword() {
    this.isHidden = true
    this.dataForm = this.fb.group({
      id: ["", [Validators.required]],
    })
    this.dataForm.valueChanges.subscribe(() => {
      console.log("dataForm: ", this.dataForm);
      
      if (this.dataForm.get('id').hasError('pattern') || this.dataForm.get('id').hasError('required')) {
        this.nomMessage = "المرجو إدخال بريدك الإلكتروني"
        setTimeout(() => {
          this.nomMessage = ""
        }, 5000);
      }
    })
  }

  changePassword() {
    if (this.isHidden) {
      this.presentAlert()
    } else {
      let data = this.dataForm.value
      this.passwordService.changePassword(data).subscribe((res) => {
        this.toastService.presentSuccessToast('', 5000)
        this.dismiss()
      }, err => {
        if (err.status == 401) {
          this.toastService.presentErrorToast('معلومات خاطئة', 5000)
        } else if (err.status == 409) {
          this.toastService.presentErrorToast('معلومات خاطئة', 5000)
        } else {
          this.toastService.presentErrorToast('', 5000)
        }
      })
    }
  }

  forgotPassword() {
    let data = this.dataForm.value
    this.passwordService.forgotPassword(data).subscribe((newpass) => {
      this.toastService.presentSuccessToast(`رمزك السري الجديد هو ${newpass}`, 15000)
      this.dismiss()

    }, err => {
      if (err.status == 409) {
        this.toastService.presentErrorToast('معلومات خاطئة', 5000)
      } else {
        this.toastService.presentErrorToast('', 5000)
      }
    })
  }
  async presentAlert() {
    var msg = "سوف يتم إرسال رمز سري جديد إلى بريدكم الإلكتروني"
    const alert = await this.alertIonic.create({
      cssClass: 'my-custom-class',
      header: '',
      subHeader: '',
      message: msg,
      buttons: ['إلغاء', {
        text: 'تأكيد',
        handler: () => {
          this.forgotPassword()
        }
      }
      ]
    });
    await alert.present()
  }


}
