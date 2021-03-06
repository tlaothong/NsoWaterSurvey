import { Store } from '@ngrx/store'
import { map } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IonicPage, NavController } from 'ionic-angular';
import { getUserData } from '../../states/logging';
import { LoggingState } from '../../states/logging/logging.reducer';
import { AppStateProvider } from '../../providers/app-state/app-state';
import { CloudSyncProvider } from '../../providers/cloud-sync/cloud-sync';
import { NavParams } from 'ionic-angular/navigation/nav-params';

@IonicPage()
@Component({
  selector: 'page-confirmlogin',
  templateUrl: 'confirmlogin.html',
})

export class ConfirmloginPage {

  private formData$ = this.store.select(getUserData).pipe(map(s => s));
  private userData: any;
  private fg: FormGroup;
  private guid: any;

  constructor(private fb: FormBuilder, private navCtrl: NavController, private navParams: NavParams, private store: Store<LoggingState>,
    private appState: AppStateProvider, private cloud: CloudSyncProvider) {

    this.fg = fb.group({
      '_idqr': null,
      'idUser': null,
      'password': null,
      'name': null,
      'email': null,
      'idEA': null
    });

    let username = this.navParams.data.username;
    this.cloud.getUserInfo(username).subscribe((response: any) => {
      this.fg = fb.group({
        '_idqr': null,
        'idUser': response._id,
        'password': null,
        'name': response.titleName + response.firstName + " " + response.lastName,
        'email': response.email,
        'idEA': null
      });
    });
    this.guid = this.navParams.data.guid;
  }

  goGetworkPage() {
    this.navCtrl.push("FirstloginPage", { form: this.fg.value, guid: this.guid });
  }
}
