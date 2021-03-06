import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getUserData } from '../../states/logging';
import { LoggingState } from '../../states/logging/logging.reducer';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { AppStateProvider } from '../../providers/app-state/app-state';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { Device } from '@ionic-native/device';
import { CloudSyncProvider } from '../../providers/cloud-sync/cloud-sync';

@IonicPage()
@Component({
  selector: 'page-firstlogin',
  templateUrl: 'firstlogin.html',
})

export class FirstloginPage {
  f: FormGroup;
  private formData$ = this.store.select(getUserData).pipe(map(s => s));
  public riceDoing: boolean;
  private guid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Store<LoggingState>,
    private fb: FormBuilder, private alertCtrl: AlertController, private appState: AppStateProvider,
    private dataStore: DataStoreProvider, private device: Device, private cloud: CloudSyncProvider,
    private appstate: AppStateProvider) {

    this.f = this.fb.group({
      '_idqr': null,
      'idUser': null,
      'password': null,
      'name': null,
      'email': null,
      'idEA': null
    });
    this.f.setValue(this.navParams.data.form);
    this.guid = this.navParams.data.guid;
  }

  goConfirmloginPage(confirmPassword: any) {

    let password = this.f.get('password').value;

    let alert = this.alertCtrl.create({
      message: 'กรุณากรอกรหัสผ่านให้ถูกต้อง',
      buttons: ['ยืนยัน']
    });

    if (password == confirmPassword) {

      this.dataStore.getNotiUid().take(1).subscribe(data => {
        let deviceId = this.device.serial;
        this.appState.deviceID = this.device.serial;
        let Uid = data.userId;
        let Pushtoken = data.pushToken;
        this.cloud.saveUserInfo({
          userId: this.f.get('idUser').value,
          deviceId: deviceId,
          guidId: this.guid,
          uid: Uid,
          pushToken: Pushtoken
        }).subscribe((response: any) => {

          var isTokenValid = response != null && response.token != null;
          if (isTokenValid) {
            let token = response.token.token;
            let signature = response.signed;
            let result = this.appstate.Verify(token, signature)
            if (result) {
              let username = this.f.get('idUser').value;
              this.dataStore.saveUser(username, password, token);
              this.navCtrl.setRoot("LoginPage");
            }
            else {
              let alertVerifyFail = this.alertCtrl.create({
                title: "ข้อมูลไม่สมบูรณ์",
                message:"ข้อมูลที่ได้รับไม่ถูกต้อง"
              });
              alertVerifyFail.present();
            }
          }
          else {
            let alertTokenNull = this.alertCtrl.create({
              title: "ไม่พบข้อมูล",
              message: response.errorMessage
            });
            alertTokenNull.present();
          }
        })
      });
    }
    else {
      alert.present();
    }
  }
}
