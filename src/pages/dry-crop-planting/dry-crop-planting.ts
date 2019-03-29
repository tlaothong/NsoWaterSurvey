import { FieldDryCropPlantingComponent } from './../../components/field-dry-crop-planting/field-dry-crop-planting';
import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HouseHoldState } from '../../states/household/household.reducer';
import { map } from 'rxjs/operators';
import { SetAgronomyPlantSelectPlant, SetAgiSelectAgronomy, SetSelectorIndex, LoadHouseHoldSample, SaveHouseHold } from '../../states/household/household.actions';
import { getHouseHoldSample, getArrayIsCheck, getNextPageDirection } from '../../states/household';
import { Storage } from '@ionic/storage';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { CountComponent } from '../../components/count/count';
import { AppStateProvider } from '../../providers/app-state/app-state';

@IonicPage()
@Component({
  selector: 'page-dry-crop-planting',
  templateUrl: 'dry-crop-planting.html',
})

export class DryCropPlantingPage {
  @ViewChildren(FieldDryCropPlantingComponent) private fieldDryCrop: FieldDryCropPlantingComponent[];
  @ViewChildren(CountComponent) private count: CountComponent[];
  private frontNum: any;
  private backNum: any;

  public agronomyPlant: FormGroup;
  private submitRequested: boolean;
  private isCheckWarningBox: boolean;
  shownData: string[];
  // private formDataUnit$ = this.store.select(getHouseHoldSample).pipe(map(s => s.agriculture));
  private formData$ = this.store.select(getHouseHoldSample);
  // private formData: any;

  constructor(public navCtrl: NavController, private storage: Storage, public local: LocalStorageProvider, public navParams: NavParams, private fb: FormBuilder, public modalCtrl: ModalController, private store: Store<HouseHoldState>, private appState: AppStateProvider) {
    this.agronomyPlant = this.fb.group({
      "doing": [null, Validators.required],
      "fieldCount": [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.required, Validators.min(1)])],
      "fields": this.fb.array([]),
    });
    this.setupFieldCountChanges();
  }

  ionViewDidLoad() {
    this.countNumberPage();
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.fieldDryCrop.forEach(it => it.submitRequest());
    this.count.forEach(it => it.submitRequest());
    let fields = this.agronomyPlant.get('fields').value as Array<any>;
    let selectedMap = new Map<string, any>();
    fields.forEach(f => {
      if (f.plantings && f.plantings.plants) {
        f.plantings.plants.forEach(p => selectedMap.set(p.code, p));
      }
    });
    let selected = [];
    selectedMap.forEach(v => selected.push(v));

    this.isCheckWarningBox = ((this.agronomyPlant.valid && selected.length > 0) || (this.agronomyPlant.get('doing').value == false));
    if ((this.agronomyPlant.valid && selected.length > 0) || (this.agronomyPlant.get('doing').value == false)) {
      this.arrayIsCheckMethod();
      let argi = {
        ...this.appState.houseHoldUnit.agriculture,
        agronomyPlant: this.agronomyPlant.value,
      };
      let houseHold = {
        ...this.appState.houseHoldUnit,
        agriculture: argi,
      };
      this.store.dispatch(new SaveHouseHold(houseHold));
      this.navCtrl.popTo("CheckListPage");
    }
  }

  countNumberPage() {
    console.log("onSubmit ");
    let arrayNextPage$ = this.store.select(getNextPageDirection).pipe(map(s => s));
    let arrayNextPage: any[];
    arrayNextPage$.subscribe(data => {

      if (data != null) {
        arrayNextPage = data;
        let arrLength = arrayNextPage.filter((it) => it == true);
        this.backNum = arrLength.length;
      }

    });
    console.log("back", this.backNum);

    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: any[];
    arrayIsCheck$.subscribe(data => {

      if (data != null) {
        arrayIsCheck = data
        this.frontNum = arrayIsCheck.length;
      }

    });
    console.log("frontNum", this.frontNum);
  }

  arrayIsCheckMethod() {
    this.store.dispatch(new SetSelectorIndex(3));
    // let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    // let arrayIsCheck: Array<number>;
    // arrayIsCheck$.subscribe(data => {

    //   if (data != null) {
    //     arrayIsCheck = data;

    //     if (arrayIsCheck.every(it => it != 3)) {
    //       arrayIsCheck.push(3);
    //     }

    //     console.log(arrayIsCheck);
    //   }

    // });
  }

  public isValid(name: string): boolean {
    var ctrl = this.agronomyPlant.get(name);
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }

  public setupFieldCountChanges() {
    const componentFormArray: string = "fields";
    const componentCount: string = "fieldCount";

    var onComponentCountChanges = () => {
      var fieldDryCrop = (this.agronomyPlant.get(componentFormArray) as FormArray).controls || [];
      var fieldCount = this.agronomyPlant.get(componentCount).value || 0;
      var field = this.fb.array([]);

      fieldCount = Math.max(0, fieldCount);

      for (let i = 0; i < fieldCount; i++) {
        var ctrl = null;

        if (i < fieldDryCrop.length) {
          const fld = fieldDryCrop[i];
          ctrl = fld;
        } else {
          ctrl = FieldDryCropPlantingComponent.CreateFormGroup(this.fb);
        }

        field.push(ctrl);
      }
      this.agronomyPlant.setControl(componentFormArray, field);
    };

    this.agronomyPlant.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }
}
