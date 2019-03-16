import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { LoggingState } from '../../states/logging/logging.reducer';
import { LoadUserDataById, SetLogin, LoadDataWorkEAByUserId, LoadCountOfWorks } from '../../states/logging/logging.actions';
import { getUserData, getLogin, getDataWorkEA } from '../../states/logging';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {} from '../../states/bootup';
import { BootupState } from '../../states/bootup/bootup.reducer';
import { LoadBootstrap, LoginUser } from '../../states/bootup/bootup.actions';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private formDataUser$ = this.storeLogging.select(getUserData);

  formData$ = this.storeLogging.select(getUserData).pipe(map(s => s));
  private getDataLogin$ = this.storeLogging.select(getLogin);
  private getDataLogin: any;
  private userData: any;

  public dataEa: any;
  public userObj: any;
  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private store: Store<BootupState>, private storeLogging: Store<LoggingState>, private alertCtrl: AlertController) {
    this.userData = null;
  }

  // onkey(id: string) {
  //   this.store.dispatch(new LoadUserDataById(id));
  //   this.formData$.subscribe(it => this.userData = it);
  // }

  goConfirmloginPage(event: any) {
    /********************** */
    console.log('Login and LoadBootstrap!');
    this.store.dispatch(new LoginUser(event.idUser._value));
    this.navCtrl.push("GetworkPage");
    /********************** */
    // let data = {
    //   idUser: event.idUser._value,
    //   password: event.password._value
    // }
    // this.storeLogging.dispatch(new SetLogin(data));
    // this.getDataLogin$.subscribe(data => {
    //   if (data != null) {
    //     this.getDataLogin = data
    //     console.log(this.getDataLogin);
    //     if (this.getDataLogin == true) {
    //       this.storeLogging.dispatch(new LoadUserDataById(event.idUser._value));
    //       this.formDataUser$.subscribe(data => {
    //         if (data != null) {
    //           this.userObj = data
    //           console.log(this.userObj);
    //           this.storage.set('UserInfo',this.userObj);
    //         }

    //       });
    //       this.navCtrl.push("GetworkPage");
    //     }
    //     else {
    //       notFoundUser.present();
    //     }
    //   }

    // });

    // // let wrongPassword = this.alertCtrl.create({
    // //   message: 'รหัสผ่านไม่ถูกต้อง',
    // //   buttons: ['ตกลง']
    // // });
    // let notFoundUser = this.alertCtrl.create({
    //   message: 'ไม่พบผู้ใช่',
    //   buttons: ['ตกลง']
    // });



    // // if (typeof (this.userData) == 'undefined' || this.userData == null) {
    // //   notFoundUser.present();
    // // } else if (this.userData.password != event.password._value) {
    // //   wrongPassword.present();
    // // } else {
    // //   this.navCtrl.push("ConfirmloginPage");
    // // }
  }
}
