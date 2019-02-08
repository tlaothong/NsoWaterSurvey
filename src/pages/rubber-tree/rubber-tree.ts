import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { EX_RUBBER_LIST } from './../../models/tree';
import { Component, ViewChildren } from '@angular/core';
import { getHouseHoldSample, getArraySkipPageAgiculture, getWaterSource, getCheckWaterPlumbing, getArraySkipPage, getArrayIsCheck, getSelectorIndex, getNextPageDirection, getDataOfUnit } from '../../states/household';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HouseHoldState } from '../../states/household/household.reducer';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { FieldRebbertreeComponent } from '../../components/field-rebbertree/field-rebbertree';
import { SetRubberTreeSelectPlant, SetWaterSources, SetAgiSelectRubber, SetNextPageDirection, SetSelectorIndex, LoadHouseHoldSample } from './../../states/household/household.actions';
import { SetCheckWaterPlumbing, SetCheckWaterRiver, SetCheckWaterIrrigation, SetCheckWaterRain, SetCheckWaterBuying } from '../../states/household/household.actions';

@IonicPage()
@Component({
  selector: 'page-rubber-tree',
  templateUrl: 'rubber-tree.html',
})
export class RubberTreePage {

  @ViewChildren(FieldRebbertreeComponent) private fieldrebbertree: FieldRebbertreeComponent[];
  public rubbertree: FormGroup;
  private submitRequested: boolean;
  private formDataUnit$ = this.store.select(getDataOfUnit)
  private formData$: any;
  private formDatAgiculture$ = this.store.select(getArraySkipPageAgiculture).pipe(map(s => s));
  private itAgi: any;
  private formDataG1_G4$ = this.store.select(getArraySkipPage).pipe(map(s => s));
  private itG1_G4: any;
  private formCheckPlumbing$ = this.store.select(getCheckWaterPlumbing).pipe(map(s => s));
  private itPlumbing: any;
  public DataList = EX_RUBBER_LIST;
  private frontNum: any;
  private backNum: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private store: Store<HouseHoldState>) {
    this.rubbertree = this.fb.group({
      "doing": [null, Validators.required],
      "fieldCount": [null, Validators.required],
      'fields': fb.array([]),
    });

    this.setupFieldCountChanges();
  }

  ionViewDidLoad() {
    this.countNumberPage();
    this.formDataUnit$.subscribe(data => {
      if (data != null) {
        // this.formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.agriculture.rubberTree));
        this.formData$ = data;
        this.rubbertree.setValue(data.agriculture.rubberTree)
      }
    })
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.fieldrebbertree.forEach(it => it.submitRequest());
    this.store.dispatch(new SetRubberTreeSelectPlant(this.DataList));
    this.store.dispatch(new SetAgiSelectRubber(true));
    this.formData$.agriculture.rubberTree = this.rubbertree.value
    if (this.rubbertree.valid || (this.rubbertree.get('doing').value == false)) {
      this.arrayIsCheckMethod();
      this.store.dispatch(new LoadHouseHoldSample(this.formData$));
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
    this.store.dispatch(new SetSelectorIndex(4));
    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: Array<number>;
    arrayIsCheck$.subscribe(data => {

      if (data != null) {
        arrayIsCheck = data;

        if (arrayIsCheck.every(it => it != 4)) {
          arrayIsCheck.push(4);
        }

        console.log(arrayIsCheck);
      }
    });
  }


  public isValid(name: string): boolean {
    var ctrl = this.rubbertree.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }

  private setupFieldCountChanges() {
    const componentFormArray: string = "fields";
    const componentCount: string = "fieldCount";

    var onComponentCountChanges = () => {
      var fieldRubbertree = (this.rubbertree.get(componentFormArray) as FormArray).controls || [];
      var fieldCount = this.rubbertree.get(componentCount).value || 0;
      var field = this.fb.array([]);

      fieldCount = Math.max(0, fieldCount);

      for (let i = 0; i < fieldCount; i++) {
        var ctrl = null;
        if (i < fieldRubbertree.length) {
          const fld = fieldRubbertree[i];
          ctrl = fld;
        } else {
          ctrl = FieldRebbertreeComponent.CreateFormGroup(this.fb);
        }

        field.push(ctrl);
      }
      this.rubbertree.setControl(componentFormArray, field);
    };

    this.rubbertree.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }
}
