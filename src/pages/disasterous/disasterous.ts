import { Component, Input, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TableDisasterousComponent } from '../../components/table-disasterous/table-disasterous';
import { HouseHoldState } from '../../states/household/household.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getHouseHoldSample, getArrayIsCheck, getNextPageDirection } from '../../states/household';
import { SetSelectorIndex, LoadHouseHoldSample, SaveHouseHold } from '../../states/household/household.actions';
import { Storage } from '@ionic/storage';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { AppStateProvider } from '../../providers/app-state/app-state';

@IonicPage()
@Component({
  selector: 'page-disasterous',
  templateUrl: 'disasterous.html',
})
export class DisasterousPage {

  @ViewChildren(TableDisasterousComponent) private tableDisasterous: TableDisasterousComponent[];
  @Input("headline") private text: string;

  private submitRequested: boolean;
  public Disasterous: FormGroup;
  // private formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.disaster));
  private formData$ = this.store.select(getHouseHoldSample);
  public dataDis: any;
  private frontNum: any;
  private backNum: any;
  public isCheckWarningBox: boolean;

  constructor(private modalCtrl: ModalController, public local: LocalStorageProvider, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private store: Store<HouseHoldState>,
    private appState: AppStateProvider, public alertController: AlertController) {
    this.Disasterous = this.fb.group({
      '_id': null,
      'flooded': [null, Validators.required],
      'yearsDisasterous': this.fb.array([
        TableDisasterousComponent.CreateFormGroup(this.fb),
        TableDisasterousComponent.CreateFormGroup(this.fb),
        TableDisasterousComponent.CreateFormGroup(this.fb),
        TableDisasterousComponent.CreateFormGroup(this.fb),
        TableDisasterousComponent.CreateFormGroup(this.fb),
      ]),
    })
  }

  ionViewDidLoad() {
    
    // this.formData$.subscribe(data => {
    //   if (data != null) {
    //     this.Disasterous.patchValue(data.disaster)
    //     this.dataDis = data;
    //   }
    // })
  }

  public showModal() {
    const modal = this.modalCtrl.create("DlgTableDisasterousPage", { FormItem: this.Disasterous, headline: this.text });
    modal.onDidDismiss(data => {
      if (data) {
        var fg = <FormGroup>data;
        this.Disasterous.patchValue(fg.value);
      }
    });
    modal.present();
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.tableDisasterous.forEach(it => it.submitRequest());
    this.isCheckWarningBox = this.Disasterous.valid || this.Disasterous.get('flooded').value == false
      || this.tableDisasterous.some(it => it.FormItem.valid);
    // this.dataDis.disaster = this.Disasterous.value
    if (this.Disasterous.valid
      || this.Disasterous.get('flooded').value == false
      || this.tableDisasterous.some(it => it.FormItem.valid)) {
      this.arrayIsCheckMethod();
      // this.storage.set('unit', this.dataDis)
      // let id = this.dataDis._id
      // this.storage.set(id, this.dataDis)
      // this.local.updateListUnit(this.dataDis.buildingId, this.dataDis)
      let originalHouseHold = this.appState.houseHoldUnit;
      let newHouseHold = {
        ...originalHouseHold,
        disaster: this.Disasterous.value,
      };
      this.store.dispatch(new SaveHouseHold(newHouseHold));
      this.navCtrl.popTo("CheckListPage");
    }
  }

  

  arrayIsCheckMethod() {
    this.store.dispatch(new SetSelectorIndex(20));
    // let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    // let arrayIsCheck: Array<number>;
    // arrayIsCheck$.subscribe(data => {
    //   if (data != null) {
    //     arrayIsCheck = data;
    //     if (arrayIsCheck.every(it => it != 20)) {
    //       arrayIsCheck.push(20);
    //     }
    //     console.log(arrayIsCheck);
    //   }
    // });
  }

  submitRequest() {
    this.submitRequested = true;
  }

  // presentAlertDisater(num) {
  //   const alert = this.alertController.create({
  //     title: 'ต้องการจะลบใช่หรือไม่',
  //     buttons: [
  //       {
  //         text: 'ยืนยัน',
  //         handler: data => {
  //           let test = this.Disasterous.get('yearsDisasterous') as FormArray;
  //           test.at(num).reset();
  //         }
  //       },
  //       {
  //         text: 'ยกเลิก',
  //         handler: data => {

  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // deleteData(num: number) {
  //   this.presentAlertDisater(num);
  // }

  public isValid(name: string): boolean {
    var ctrl = this.Disasterous.get(name);
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }
}
