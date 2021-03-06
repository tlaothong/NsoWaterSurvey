import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TableBuyingComponent } from '../../components/table-buying/table-buying';

@IonicPage()
@Component({
  selector: 'page-dlg-table-buying',
  templateUrl: 'dlg-table-buying.html',
})
export class DlgTableBuyingPage {

  public FormItem: FormGroup;
  public text: string;
  public size: number;
  public volumn: string;
  public getIsHouseHold: any;
  public getIsAgriculture: any;
  public getIsFactorial: any;
  public getIsCommercial: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private fb: FormBuilder, public alertController: AlertController) {
    this.FormItem = navParams.get('FormItem');
    this.text = navParams.get("headline");
    this.size = navParams.get("size");
    this.volumn = navParams.get("volumn");
    this.getIsHouseHold = navParams.get("getIsHouseHold");
    this.getIsAgriculture = navParams.get("getIsAgriculture");
    this.getIsFactorial = navParams.get("getIsFactorial");
    this.getIsCommercial = navParams.get("getIsCommercial");
    this.FormItem = TableBuyingComponent.CreateFormGruop(this.fb);
    const datain = navParams.get('FormItem') as FormGroup;
    this.FormItem.setValue(datain.value);
    console.log(this.getIsHouseHold);
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
            if (this.size != null) {
              this.FormItem.get('size').setValue(this.size);
            }
            this.okDialog();
          }
        }
      ]
    });
    alert.present();
  }
  deleteData() {
    this.presentAlertPopulation();
  }

}
