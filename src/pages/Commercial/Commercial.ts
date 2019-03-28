import { SetWaterSourcesCommercial, SetSelectorIndex, LoadHouseHoldSample, SaveHouseHold } from './../../states/household/household.actions';
import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { TableCheckItemCountComponent } from '../../components/table-check-item-count/table-check-item-count';
import { WaterSources8BComponent } from '../../components/water-sources8-b/water-sources8-b';
import { Store } from '@ngrx/store';
import { HouseHoldState } from '../../states/household/household.reducer';
import { getHouseHoldSample, getArrayIsCheck, getNextPageDirection } from '../../states/household';
import { map } from 'rxjs/operators';
import { SetCommercialServiceType, SetCheckWaterPlumbing, SetCheckWaterRiver, SetCheckWaterIrrigation, SetCheckWaterRain, SetCheckWaterBuying } from '../../states/household/household.actions';
import { BuildingState } from '../../states/building/building.reducer';
import { getSendBuildingType, getOtherBuildingType } from '../../states/building';
import { Storage } from '@ionic/storage';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { AppStateProvider } from '../../providers/app-state/app-state';

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
  public otherBuildingType: any;

  // private formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.commerce));
  private formData$ = this.store.select(getHouseHoldSample);
  // private numberRoom$ = this.store.select(getNumberRoom);
  private numberRoom: boolean = false;
  // public dataCom: any;
  private getBuildingType$ = this.storeBuild.select(getSendBuildingType)
  private frontNum: any;
  private backNum: any;
  private otherBuildingType$ = this.storeBuild.select(getOtherBuildingType);

  constructor(public navCtrl: NavController, public local: LocalStorageProvider, private store: Store<HouseHoldState>, private storage: Storage, private storeBuild: Store<BuildingState>, public navParams: NavParams, public alertCtrl: AlertController, private fb: FormBuilder, private appState: AppStateProvider) {
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
        'personnelCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
      }),
      'hotelsAndResorts': this.fb.group({
        'roomCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
        'personnelCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
      }),
      'hospital': this.fb.group({
        'bedCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
        'personnelCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
      }),
      'building': this.fb.group({
        'roomCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
        'occupiedRoomCount': [null, Validators],
        'personnelCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
      }),
      'religious': this.fb.group({
        'peopleCount': [null, Validators.compose([Validators.pattern('[0-9]*')])],
      }),
      'otherBuilding': this.fb.group({
        'personnelCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
      }),
      'waterSources': WaterSources8BComponent.CreateFormGroup(this.fb),
    }, {
        validator: CommercialPage.checkAnyOrOther()
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommercialPage');
    // this.numberRoom$.subscribe(data => {
    //   if (data != null) {
    //     if(data == "-"){
    //       this.numberRoom = true
    //     }
    //     console.log(this.numberRoom);
    //   }
    // });
    this.countNumberPage();
    // this.formData$.subscribe(data => {
    //   if (data != null) {
    //     this.f.setValue(data.commerce)
    //     this.dataCom = data;
    //     console.log(data);

    //   }
    // });

    this.getBuildingType$.subscribe(data => {
      if (data != null) {
        this.f.get('buildingCode').setValue(data)
      }
    });
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
    this.store.dispatch(new SetWaterSourcesCommercial(this.f.get('waterSources').value));
    console.log(this.f);

    if (this.f.valid) {
      this.arrayIsCheckMethod();
      let originalHouseHold = this.appState.houseHoldUnit;
      let newHouseHold = {
        ...originalHouseHold,
        commerce: this.f.value,
      };
      this.store.dispatch(new SaveHouseHold(newHouseHold));
      this.navCtrl.popTo("CheckListPage");
    }
  }

  public static checkAnyOrOther(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const preSchool = c.get('questionForAcademy.preSchool');
      const kindergarten = c.get('questionForAcademy.kindergarten');
      const primarySchool = c.get('questionForAcademy.primarySchool');
      const highSchool = c.get('questionForAcademy.highSchool');
      const vocational = c.get('questionForAcademy.vocational');
      const higherEducation = c.get('questionForAcademy.higherEducation');
      const buildingCode = c.get('buildingCode');
      const personnelCountQuestionForAcademy = c.get('questionForAcademy.personnelCount');
      const roomCountHotelsAndResorts = c.get('hotelsAndResorts.roomCount');
      const personnelCountHotelsAndResorts = c.get('hotelsAndResorts.personnelCount');
      const bedCount = c.get('hospital.bedCount');
      const personnelCountHospital = c.get('hospital.personnelCount');
      const roomCountBuilding = c.get('building.roomCount');
      const occupiedRoomCount = c.get('building.occupiedRoomCount');
      const personnelCountBuilding = c.get('building.personnelCount');
      const peopleCount = c.get('religious.peopleCount');
      const personnelCountOtherBuilding = c.get('otherBuilding.personnelCount');

      if (personnelCountQuestionForAcademy.value == null && (buildingCode.value == 11 || buildingCode.value == 12) && !preSchool.value.itemCount && !kindergarten.value.itemCount && !primarySchool.value.itemCount
        && !highSchool.value.itemCount && !vocational.value.itemCount && !higherEducation.value.itemCount) {
        return { 'anycheck': true, 'personnelCountQuestionForAcademy': true };
      }
      if ((buildingCode.value == 11 || buildingCode.value == 12) && !preSchool.value.itemCount && !kindergarten.value.itemCount && !primarySchool.value.itemCount
        && !highSchool.value.itemCount && !vocational.value.itemCount && !higherEducation.value.itemCount) {
        return { 'anycheck': true };
      }
      if ((buildingCode.value == 11 || buildingCode.value == 12) && personnelCountQuestionForAcademy.value == null) {
        return { 'personnelCountQuestionForAcademy': true };
      }
      if (buildingCode.value == 6 && roomCountHotelsAndResorts.value == null) {
        return { 'roomCountHotelsAndResorts': true };
      }
      if (buildingCode.value == 6 && personnelCountHotelsAndResorts.value == null) {
        return { 'personnelCountHotelsAndResorts': true };
      }
      if ((buildingCode.value == 7 || buildingCode.value == 8) && bedCount.value == null && personnelCountHospital.value == null) {
        return { 'bedCount': true, 'personnelCountHospital': true };
      }
      if ((buildingCode.value == 7 || buildingCode.value == 8) && bedCount.value == null) {
        return { 'bedCount': true };
      }
      if ((buildingCode.value == 7 || buildingCode.value == 8) && personnelCountHospital.value == null) {
        return { 'personnelCountHospital': true };
      }
      if (buildingCode.value == 4 && roomCountBuilding.value == null && occupiedRoomCount.value == null && personnelCountBuilding.value == null) {
        return { 'roomCountBuilding': true, 'occupiedRoomCount': true, 'personnelCountBuilding': true };
      }
      if (buildingCode.value == 4 && roomCountBuilding.value == null) {
        return { 'roomCountBuilding': true };
      }
      if (buildingCode.value == 4 && occupiedRoomCount.value == null) {
        return { 'occupiedRoomCount': true };
      }
      if (buildingCode.value == 4 && personnelCountBuilding.value == null) {
        return { 'personnelCountBuilding': true };
      }
      if (buildingCode.value == 10 && peopleCount.value == null) {
        return { 'peopleCount': true };
      }
      if ((buildingCode.value == 1 || buildingCode.value == 2 || buildingCode.value == 3
        || buildingCode.value == 5 || buildingCode.value == 9 || buildingCode.value == 13 || buildingCode.value == 14
        || buildingCode.value == 15 || buildingCode.value == 16) && personnelCountOtherBuilding.value == null) {
        return { 'personnelCountOtherBuilding': true };
      }

      return null;
    }
  }

  public isValid(name: string): boolean {
    var ctrl = this.f.get(name);
    if (name == 'questionForAcademy.personnelCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.personnelCountQuestionForAcademy && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'hotelsAndResorts.roomCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.roomCountHotelsAndResorts && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'hotelsAndResorts.personnelCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.personnelCountHotelsAndResorts && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'hospital.bedCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.bedCount && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'hospital.personnelCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.personnelCountHospital && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'building.roomCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.roomCountBuilding && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'building.occupiedRoomCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.occupiedRoomCount && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'building.personnelCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.personnelCountBuilding && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'religious.peopleCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.peopleCount && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'otherBuilding.personnelCount') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.personnelCountOtherBuilding && (ctrl.touched || this.submitRequested);
    }

    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }

  countNumberPage() {
    let arrayNextPage$ = this.store.select(getNextPageDirection).pipe(map(s => s));
    let arrayNextPage: any[];
    arrayNextPage$.subscribe(data => {

      if (data != null) {
        arrayNextPage = data;
        let arrLength = arrayNextPage.filter((it) => it == true);
        this.backNum = arrLength.length;
      }
    });
    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: any[];
    arrayIsCheck$.subscribe(data => {

      if (data != null) {
        arrayIsCheck = data
        this.frontNum = arrayIsCheck.length;
      }

    });
  }

  arrayIsCheckMethod() {
    this.store.dispatch(new SetSelectorIndex(12));
    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: Array<number>;
    arrayIsCheck$.subscribe(data => {
      if (data != null) {
        arrayIsCheck = data;
        if (arrayIsCheck.every(it => it != 12)) {
          arrayIsCheck.push(12);
        }
      }
    });
  }

}
