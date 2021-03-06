import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-dlg-count',
  templateUrl: 'dlg-count.html',
})
export class DlgCountPage {

  public title: string
  public FormItem: FormGroup;
  public submitRequested: boolean;
  public bePlant: boolean;
  public beUnitCount: boolean;
  public beResidential: boolean;
  public beWater: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private viewCtrl: ViewController) {
    this.FormItem = fb.group({
      'count': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.required, Validators.min(0)])]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DlgCountPage');
    let count = this.navParams.get('count')
    if (count == 0) count = null;
    this.FormItem.get('count').setValue(count);
    this.title = this.navParams.get('title');
    this.bePlant = this.navParams.get('bePlant');
    this.beUnitCount = this.navParams.get('beUnitCount');
    this.beResidential = this.navParams.get('beResidential');
    this.beWater = this.navParams.get('beWater');
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }

  public closeDialog() {
    this.viewCtrl.dismiss();
  }

  public okDialog() {
    this.submitRequested = true;
    if (this.FormItem.valid) {
      this.viewCtrl.dismiss(this.FormItem.get('count').value);
    }
  }

}