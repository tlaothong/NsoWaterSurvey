import { SetWaterSourcesCommercial, SetNextPageDirection, SetSelectorIndex } from './../../states/household/household.actions';
import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableCheckItemCountComponent } from '../../components/table-check-item-count/table-check-item-count';
import { WaterSources8BComponent } from '../../components/water-sources8-b/water-sources8-b';
import { Store } from '@ngrx/store';
import { HouseHoldState } from '../../states/household/household.reducer';
import { getHouseHoldSample, getCheckWaterPlumbing, getArrayIsCheck, getSelectorIndex, getNextPageDirection, getDataOfUnit } from '../../states/household';
import { map } from 'rxjs/operators';
import { SetCommercialServiceType, SetCheckWaterPlumbing, SetCheckWaterRiver, SetCheckWaterIrrigation, SetCheckWaterRain, SetCheckWaterBuying } from '../../states/household/household.actions';
import { BuildingState } from '../../states/building/building.reducer';
import { getSendBuildingType, getOtherBuildingType } from '../../states/building';

@IonicPage()
@Component({
  selector: 'page-Commercial',
  templateUrl: 'Commercial.html',
})
export class CommercialPage {

  @ViewChildren(TableCheckItemCountComponent) private tableCheckItemCount: TableCheckItemCountComponent[];
  @ViewChildren(WaterSources8BComponent) private waterSources8B: WaterSources8BComponent[];

  private f: FormGroup;
  private submitRequested: boolean;
  private itPlumbing: any;
  public otherBuildingType: any;

  private formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.commerce));
  private formCheckPlumbing$ = this.store.select(getCheckWaterPlumbing).pipe(map(s => s));
  private getBuildingType$ = this.store.select(getSendBuildingType)
  private frontNum: any;
  private backNum: any;
  private otherBuildingType$ = this.storeBuild.select(getOtherBuildingType);

  constructor(public navCtrl: NavController, private store: Store<HouseHoldState>, private storeBuild: Store<BuildingState>, public navParams: NavParams, public alertCtrl: AlertController, private fb: FormBuilder, private storeBuilding: Store<BuildingState>) {
    this.f = this.fb.group({
      'name': [null, Validators.required],
      'serviceType': [null, Validators.required],
      'buildingCode': [null, Validators.required],
      'questionForAcademy': this.fb.group({
        'preSchool': TableCheckItemCountComponent.CreateFormGroup(this.fb),
        'kindergarten': TableCheckItemCountComponent.CreateFormGroup(this.fb),
        'primarySchool': TableCheckItemCountComponent.CreateFormGroup(this.fb),
        'highSchool': TableCheckItemCountComponent.CreateFormGroup(this.fb),
        'vocational': TableCheckItemCountComponent.CreateFormGroup(this.fb),
        'higherEducation': TableCheckItemCountComponent.CreateFormGroup(this.fb),
        'personnelCount': [null, Validators.required],
      }),
      'hotelsAndResorts': this.fb.group({
        'roomCount': [null, Validators.required],
        'personnelCount': [null, Validators.required],
      }),
      'hospital': this.fb.group({
        'bedCount': [null, Validators.required],
        'personnelCount': [null, Validators.required],
      }),
      'building': this.fb.group({
        'roomCount': [null, Validators.required],
        'occupiedRoomCount': [null, Validators.required],
        'personnelCount': [null, Validators.required],
      }),
      'religious': this.fb.group({
        'peopleCount': [null, Validators.required],
      }),
      'otherBuilding': this.fb.group({
        'personnelCount': [null, Validators.required],
      }),
      'waterSources': WaterSources8BComponent.CreateFormGroup(this.fb),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommercialPage');
    this.countNumberPage();
    this.formData$.subscribe(data => {
      if (data != null) {
        this.f.setValue(data)
      }
    });
    this.getBuildingType$.subscribe(data => this.f.get('buildingCode').setValue(data));
    this.otherBuildingType$.subscribe(data => {
      if (data != null) {
        this.otherBuildingType = data
      }
    });
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.tableCheckItemCount.forEach(it => it.submitRequest());
    this.waterSources8B.forEach(it => it.submitRequest());
    this.store.dispatch(new SetCommercialServiceType(this.f.get('serviceType').value));
    // this.store.dispatch(new SetWaterSources([(this.f.get('waterSources.plumbing').value),
    // (this.f.get('waterSources.underGround').value),
    // (this.f.get('waterSources.river').value),
    // (this.f.get('waterSources.pool').value),
    // (this.f.get('waterSources.irrigation').value),
    // (this.f.get('waterSources.rain').value),
    // (this.f.get('waterSources.buying').value)]));
    this.store.dispatch(new SetWaterSourcesCommercial(this.f.get('waterSources').value));
    console.log("waterCom", this.f.get('waterSources').value);
    // this.store.dispatch(new SetNextPageDirection(13));

    this.dispatchWaterSource();
    if (this.f.valid) {
      this.arrayIsCheckMethod();
      this.navCtrl.popTo("CheckListPage");
      // this.checkNextPage();
    }
  }

  countNumberPage() {
    console.log("onSubmit ");
    let arrayNextPage$ = this.store.select(getNextPageDirection).pipe(map(s => s));
    let arrayNextPage: any[];
    arrayNextPage$.subscribe(data => {

      if (data != null) {
        arrayNextPage = data;
        this.backNum = arrayNextPage.length;
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
        if (arrayIsCheck.every(it => it != 12)) {
          arrayIsCheck.push(12);
        }

        console.log(arrayIsCheck);
      }
    });
  }

  private dispatchWaterSource() {
    if (this.f.get('waterSources.plumbing').value) {
      this.store.dispatch(new SetCheckWaterPlumbing(this.f.get('waterSources.plumbing').value));
    }
    if (this.f.get('waterSources.river').value) {
      this.store.dispatch(new SetCheckWaterRiver(this.f.get('waterSources.river').value));
    }
    if (this.f.get('waterSources.irrigation').value) {
      this.store.dispatch(new SetCheckWaterIrrigation(this.f.get('waterSources.irrigation').value));
    }
    if (this.f.get('waterSources.rain').value) {
      this.store.dispatch(new SetCheckWaterRain(this.f.get('waterSources.rain').value));
    }
    if (this.f.get('waterSources.buying').value) {
      this.store.dispatch(new SetCheckWaterBuying(this.f.get('waterSources.buying').value));
    }
  }

  private checkNextPage() {
    this.formCheckPlumbing$.subscribe(data => {
      if (data != null) {
        this.itPlumbing = data;
      }
      console.log("itWaterAfter: ", this.itPlumbing);
    });
    if (this.itPlumbing) {
      this.navCtrl.push("PlumbingPage")
    }
    else {
      this.navCtrl.push("GroundWaterPage")
    }
  }

  public isValid(name: string): boolean {
    var ctrl = this.f.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }
}
