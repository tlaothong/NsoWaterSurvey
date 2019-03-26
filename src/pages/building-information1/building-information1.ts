import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BuildingState } from '../../states/building/building.reducer';
import { SetSendBuildingType, SaveBuilding, SetOtherBuildingType, SaveBuildingSuccess } from '../../states/building/building.actions';
import { LoggingState } from '../../states/logging/logging.reducer';
import { getDataBuilding } from '../../states/logging';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Guid } from 'guid-typescript';
import { AppStateProvider } from '../../providers/app-state/app-state';

@IonicPage()
@Component({
  selector: 'page-building-information1',
  templateUrl: 'building-information1.html',
})
export class BuildingInformation1Page {

  public f: FormGroup;
  private submitRequested: boolean;

  public lat: any;
  public long: any;

  public index: number;
  public access: number;
  public comment: string = '';

  public checkFormButtonsForBuilding: boolean = true;

  private dataBuilding$ = this.store.select(getDataBuilding);
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private alertCtrl: AlertController, private geolocation: Geolocation, public fb: FormBuilder, private store: Store<BuildingState>, private storeLog: Store<LoggingState>, private appState: AppStateProvider) {
    this.f = BuildingInformation1Page.CreateFormGroup(fb);
    this.f.get('ea').setValue(this.appState.eaCode);
    this.f.get('_id').setValue(navParams.get('id'));
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      'ea': null,
      'ordering': [0],
      'road': [null, Validators.required],
      'alley': [null, Validators.required],
      'name': [null, Validators.required],
      'houseNo': [null, Validators.required],
      'latitude': [null, Validators.required],
      'longitude': [null, Validators.required],
      'buildingType': [null, Validators.required],
      'other': [null, Validators],
      'accessCount': [0],
      'access': fb.array([]),
      'vacancyCount': [null, Validators],
      'abandonedCount': [null, Validators],
      'comments': fb.array([]),
      'recCtrl': [null],
      'vacantRoomCount': [null],
      'unitCountComplete': 0,
      'unitCount': 0,
      'unitAccess': 0,
      'occupiedRoomCount': [null],
      'waterQuantity': fb.group({
        "waterQuantity": 0,
        "cubicMeterPerMonth": null,
        "waterBill": null,
      }),
      'floorCount': [null],
      '_id': [null],
      'status': [null],
      'lastUpdate': null,
    }, {
        validator: BuildingInformation1Page.checkAnyOrOther()
      });
  }

  public static checkAnyOrOther(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const buildingType = c.get('buildingType');
      const other = c.get('other');

      if (buildingType.value == 16 && (other.value == null || other.value.trim() == '')) {
        return { 'other': true };
      }
      return null;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuildingInformation1Page');
    this.loadMap()
    // this.dataBuilding$.subscribe(data => {
    //   if (data != null) {
    //     console.log(data);
    //     this.f.get('accessCount').setValue(data.accessCount);
    //     this.setupCountChanges();
    //     this.f.setValue(data);
    //   }
    // });
    let id = this.f.get('_id').value;
    this.setupCountChanges();
    console.log(id);

    this.storage.get(id).then((data) => {
      if (data != null) {
        console.log("DATA: " + JSON.stringify(data));
        this.f.patchValue(data);
        this.f.get('accessCount').setValue(data.accessCount);
        this.setupCountChanges();
      } else {
        this.storage.get('road').then((val) => {
          if (val != null) {
            this.f.get('road').setValue(val);
          }
        })
        this.storage.get('alley').then((val) => {
          if (val != null) {
            this.f.get('alley').setValue(val);
          }
        })
        this.storage.get('name').then((val) => {
          if (val != null) {
            this.f.get('name').setValue(val);
          }
        })
      }
    });
  }

  loadMap() {
    let options = { enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(options).then((loacation) => {
      this.long = loacation.coords.longitude,
        this.lat = loacation.coords.latitude
    }, err => {
      console.log(err);

    });
  }

  addLocation() {
    console.log(this.lat, this.long);
    if ((this.lat || this.long) == null) {
      const alert = this.alertCtrl.create({
        title: "กรุณารอสักครู่",
      });
      alert.present();
      this.loadMap()
    } else {
      this.f.get('latitude').setValue(this.lat);
      this.f.get('longitude').setValue(this.long);
    }
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.updateStatus();
    console.log("access", this.access);

    if (this.f.valid && this.access == 1) {
      this.dispatch();
      this.navCtrl.push("BuidlingInformation2Page", { f: this.f });
      // this.storage.set('key', this.f.value)
    }
    else if (this.f.valid && this.checkAccess4()) {
      this.dispatch();
      this.navCtrl.push("HomesPage", { f: this.f });
    }
  }

  public dispatch() {
    let idBD = this.f.get('_id').value
    let listBD: any;
    let fgac = this.f.get('access') as FormArray;
    let fgcm = this.f.get('comments') as FormArray;
    fgac.at(this.index).setValue(this.access);
    fgcm.at(this.index).setValue({ 'at': Date.now(), 'text': this.comment });
    this.f.get('lastUpdate').setValue(Date.now())
    console.log(this.f.get('lastUpdate').value);

    this.store.dispatch(new SetSendBuildingType(this.f.get('buildingType').value));
    this.store.dispatch(new SetOtherBuildingType(this.f.get('other').value));
    // this.store.dispatch(new SetHomeBuilding(this.f.value));

    if (idBD == null) {
      this.f.get('_id').setValue(this.appState.generateId('bld'));
      // idBD = this.f.get('_id').value
    }
    console.log(this.f.value);
    this.storage.set('road', this.f.get('road').value)
    this.storage.set('alley', this.f.get('alley').value)
    this.storage.set('name', this.f.get('name').value)

    // this.storage.set(idBD, this.f.value)
    this.store.dispatch(new SaveBuilding(this.f.value));

    // this.storage.get(this.f.get('ea').value).then((data) => {
    //   listBD = data
    //   if (listBD != null) {
    //     let fin = listBD.find(it => it._id == idBD)
    //     if (fin == null) {
    //       listBD.push(this.f.value)
    //       this.storage.set(this.f.get('ea').value, listBD)
    //     } else {
    //       let index = listBD.findIndex(it => it._id == idBD)
    //       listBD.splice(index, 1, this.f.value);
    //       // listBD.push(this.f.value);
    //       this.storage.set(this.f.get('ea').value, listBD)
    //     }
    //   } else {
    //     listBD = []
    //     listBD.push(this.f.value)
    //     this.storage.set(this.f.get('ea').value, listBD)
    //   }
    // })
  }

  public updateStatus() {
    switch (this.access) {
      case 1:
        if (this.f.get('status').value == null) {
          this.f.get('status').setValue('pause');
        }
        break;
      case 2:
      case 3:
        (this.index < 2) ? this.f.get('status').setValue('refresh') : this.f.get('status').setValue('done-all')
        break;
      case 4:
        this.f.get('status').setValue('done-all')
        break;
      default:
        break;
    }
  }

  public checkAccess4() {
    return (this.access == 4) ?
      (this.f.get('vacancyCount').value > 0 || this.f.get('abandonedCount').value > 0)
      && this.f.get('vacancyCount').value != null
      && this.f.get('abandonedCount').value != null
      : true;
  }

  public isValid(name: string): boolean {
    var ctrl = this.f.get(name);
    if (name == 'other') {
      let ctrls = this.f;
      return ctrls.errors && ctrls.errors.other && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'vacancyCount' || name == 'abandonedCount') {
      let vacancyCount = this.f.get('vacancyCount');
      let abandonedCount = this.f.get('abandonedCount');
      return (!(vacancyCount.value > 0 || abandonedCount.value > 0) || ctrl.value == null) && (ctrl.dirty || this.submitRequested);
    }
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }

  public isValidAccess(): boolean {
    return !this.access && this.submitRequested;
  }

  public static CreateComment(fb: FormBuilder): FormGroup {
    return fb.group({
      'at': [null],
      'text': [null],
    });
  }

  private setupCountChanges() {
    let status = this.f.get('status').value;
    if (status == 'pause' || status == 'done-all') {
      this.index = this.f.get('accessCount').value - 1;
      this.access = this.f.get('access').value[this.index];
      this.comment = this.f.get('comments').value[this.index].text;
    }
    else {
      this.index = this.f.get('accessCount').value;
    }
    this.f.get('accessCount').setValue(this.index + 1);

    this.setupAccessCountChanges();
    this.setupAccessCountChangesForComments();
  }

  private setupAccessCountChanges() {
    const componentFormArray: string = "access";
    const componentCount: string = "accessCount";

    var onComponentCountChanges = () => {
      var accesses = (this.f.get(componentFormArray) as FormArray).controls || [];
      var accessCount = this.f.get(componentCount).value || 0;
      var farr = this.fb.array([]);

      accessCount = Math.max(0, accessCount);

      for (let i = 0; i < accessCount; i++) {
        var ctrl = null;
        if (i < accesses.length) {
          const fld = accesses[i];
          ctrl = fld;
        } else {
          ctrl = new FormControl();
        }

        farr.push(ctrl);
      }
      this.f.setControl(componentFormArray, farr);
    };

    this.f.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

  private setupAccessCountChangesForComments() {
    const componentFormArray: string = "comments";
    const componentCount: string = "accessCount";

    var onComponentCountChanges = () => {
      var comments = (this.f.get(componentFormArray) as FormArray).controls || [];
      var accessCount = this.f.get(componentCount).value || 0;
      var farr = this.fb.array([]);

      accessCount = Math.max(0, accessCount);

      for (let i = 0; i < accessCount; i++) {
        var ctrl = null;
        if (i < comments.length) {
          const fld = comments[i];
          ctrl = fld;
        } else {
          ctrl = BuildingInformation1Page.CreateComment(this.fb);
        }

        farr.push(ctrl);
      }
      this.f.setControl(componentFormArray, farr);
    };

    this.f.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }
}
