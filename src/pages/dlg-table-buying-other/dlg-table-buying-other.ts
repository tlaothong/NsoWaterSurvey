import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TableBuyingOtherComponent } from '../../components/table-buying-other/table-buying-other';

@IonicPage()
@Component({
  selector: 'page-dlg-table-buying-other',
  templateUrl: 'dlg-table-buying-other.html',
})
export class DlgTableBuyingOtherPage {

  public FormItem: FormGroup;
  public text: string;
  public size: string;
  public getIsHouseHold: string;
  public getIsAgriculture: string;
  public getIsFactorial: string;
  public getIsCommercial: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private viewCtrl: ViewController, public alertController: AlertController) {
    this.FormItem = navParams.get('FormItem');
    this.FormItem = TableBuyingOtherComponent.CreateFormGroup(this.fb);
    const datain = navParams.get('FormItem') as FormGroup;
    this.FormItem.setValue(datain.value);
    this.text = navParams.get("headline");
    this.size = navParams.get("size");
    this.getIsHouseHold = navParams.get("getIsHouseHold");
    this.getIsAgriculture = navParams.get("getIsAgriculture");
    this.getIsFactorial = navParams.get("getIsFactorial");
    this.getIsCommercial = navParams.get("getIsCommercial");
  }

  public closeDialog() {
    this.viewCtrl.dismiss();
  }

  public okDialog() {

    this.viewCtrl.dismiss(this.FormItem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DlgTableBuyingPage');
    if (this.getIsHouseHold == 'false') {
      this.FormItem.get('drink').setValue(0);
    }
    if (this.getIsAgriculture == 'false') {
      this.FormItem.get('agriculture').setValue(0);
    }
    if (this.getIsFactorial == 'false') {
      this.FormItem.get('factory').setValue(0);
    }
    if (this.getIsCommercial == 'false') {
      this.FormItem.get('service').setValue(0);
    }
    if (this.FormItem.get('name').value == null) {
      this.FormItem.get('name').setValue(this.text);
    }
    if (this.FormItem.get('size').value == null) {
      this.FormItem.get('size').setValue(this.size);
    }
    console.log(this.FormItem.value);
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.dirty);
  }

  presentAlertPopulation() {
    const alert = this.alertController.create({
      title: 'คุณต้องการจะลบข้อมูลหรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: data => {
          }
        },
        {
          text: 'ยืนยัน',
          handler: data => {
            this.FormItem.reset();
            this.FormItem.get('size').setValue(this.size);
            this.okDialog();
          }
        }
      ]
    });
    alert.present();
  }
  deleteData() {
    this.presentAlertPopulation()
  }
}