import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldAreaComponent } from '../../components/field-area/field-area';

@IonicPage()
@Component({
  selector: 'page-dlg-field-area',
  templateUrl: 'dlg-field-area.html',
})
export class DlgFieldAreaPage {

  public FormItem: FormGroup;
  public text: string;
  public isAnimal: boolean;
  public checkIsPool: boolean;

  private submitRequested: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private viewCtrl: ViewController) {
    this.FormItem = FieldAreaComponent.CreateFormGroup(this.fb);
    const datain = navParams.get('FormItem') as FormGroup;
    this.FormItem.setValue(datain.value);
    this.text = navParams.get("headline");
    this.isAnimal = navParams.get("isAnimal");
    this.checkIsPool = navParams.get("checkIsPool");
  }

  public closeDialog() {
    this.viewCtrl.dismiss();
  }

  public okDialog() {
    this.submitRequested = true;
    this.fillInZero();
    if (this.isCheckAny() && this.FormItem.valid) {
      this.viewCtrl.dismiss(this.FormItem);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DlgFieldAreaPage');
    console.log(this.isAnimal);
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return (!this.isCheckAny() || ctrl.invalid) && (ctrl.dirty || this.submitRequested);
  }

  public isCheckAny(): boolean {
    return this.FormItem.get('rai').value > 0
      || this.FormItem.get('ngan').value > 0
      || this.FormItem.get('sqWa').value > 0
  }

  public fillInZero() {
    if (this.FormItem.get('rai').value == null) {
      this.FormItem.get('rai').setValue("0");
    }
    if (this.FormItem.get('ngan').value == null) {
      this.FormItem.get('ngan').setValue("0");
    }
    if (this.FormItem.get('sqWa').value == null) {
      this.FormItem.get('sqWa').setValue("0");
    }
  }

}
