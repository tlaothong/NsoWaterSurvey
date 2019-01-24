import { Component, Input, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableDisasterousComponent } from '../../components/table-disasterous/table-disasterous';
import { HouseHoldState } from '../../states/household/household.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { getHouseHoldSample, getArrayIsCheck, getSelectorIndex } from '../../states/household';
import { SetNextPageDirection, SetSelectorIndex } from '../../states/household/household.actions';

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
  private formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.disaster));

  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, private store: Store<HouseHoldState>) {
    this.Disasterous = this.fb.group({
      '_id': [null],
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
    this.formData$.subscribe(data => this.Disasterous.setValue(data));
  }

  public showModal() {
    const modal = this.modalCtrl.create("DlgTableDisasterousPage", { FormItem: this.Disasterous, headline: this.text });
    modal.onDidDismiss(data => {
      if (data) {
        var fg = <FormGroup>data;
        this.Disasterous.setValue(fg.value);
      }
    });
    modal.present();
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.tableDisasterous.forEach(it => it.submitRequest());

    if (this.Disasterous.valid) {
      this.arrayIsCheckMethod();
      this.navCtrl.setRoot("CheckListPage");
      // this.navCtrl.push("UserPage");
    }
  }

  arrayIsCheckMethod() {
    let selectorIndex$ = this.store.select(getSelectorIndex).pipe(map(s => s));
    let index: any;
    selectorIndex$.subscribe(data => {

      if (data != null) {
        index = data
        console.log("selectIndex: ", index);
      }
    });
    
    this.store.dispatch(new SetSelectorIndex(index + 1));
    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: Array<number>;
    arrayIsCheck$.subscribe(data => {
      if (data != null) {
        arrayIsCheck = data;
        arrayIsCheck.push(20);
        console.log(arrayIsCheck);
      }
    });
  }

  submitRequest() {
    this.submitRequested = true;
  }

  public isValid(name: string): boolean {
    var ctrl = this.Disasterous.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }
}
