import { Component, Input, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { TableDisasterousComponent } from '../../components/table-disasterous/table-disasterous';
import { HouseHoldState } from '../../states/household/household.reducer';
import { Store } from '@ngrx/store';
import { getHouseHoldSample } from '../../states/household';
import { SetSelectorIndex, SaveHouseHold } from '../../states/household/household.actions';
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

  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,
    private store: Store<HouseHoldState>, private appState: AppStateProvider, public alertController: AlertController) {
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
    }, {
        validator: DisasterousPage.checkAnyOrOther()
      })
  }

  ionViewDidLoad() {

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
      let originalHouseHold = this.appState.houseHoldUnit;
      let newHouseHold = {
        ...originalHouseHold,
        disaster: this.Disasterous.value,
      };
      this.store.dispatch(new SaveHouseHold(newHouseHold));
      this.navCtrl.popTo("CheckListPage");
    }
  }
  public static checkAnyOrOther(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const flooded = c.get('flooded');

      if (flooded.value == null) {
        return { 'flooded': true };
      }

      return null;
    }
  }

  arrayIsCheckMethod() {
    this.store.dispatch(new SetSelectorIndex(20));
  }

  submitRequest() {
    this.submitRequested = true;
  }

  public isValid(name: string): boolean {
    var ctrl = this.Disasterous.get(name);
    var isCheckTableDisasterous = this.tableDisasterous ? this.tableDisasterous.some(it => it.FormItem.valid) : false;
    if (name == 'flooded') {
      return ctrl.errors && ctrl.errors.flooded && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'isCheckTableDisasterous') {
      return !isCheckTableDisasterous && this.submitRequested;
    }
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }
}
