import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FieldHerbsPlantComponent } from '../../components/field-herbs-plant/field-herbs-plant';
import { Store } from '@ngrx/store';
import { HouseHoldState } from '../../states/household/household.reducer';
import { getHouseHoldSample, getAgronomyPlantSelectPlant, getPerennialPlantSelectPlant, getRicePlantSelectPlant, getRubberTreeSelectPlant, getAgiSelectRice, getAgiSelectAgronomy, getAgiSelectRubber, getAgiSelectPerennial, getArraySkipPageAgiculture, getWaterSource, getCheckWaterPlumbing, getArraySkipPage, getArrayIsCheck, getSelectorIndex, getNextPageDirection, getDataOfUnit } from '../../states/household';
import { map } from 'rxjs/operators';
import { SetWaterSources, SetNextPageDirection, SetSelectorIndex, LoadHouseHoldSample } from '../../states/household/household.actions';

@IonicPage()
@Component({
  selector: 'page-herbs-plant',
  templateUrl: 'herbs-plant.html',
})

export class HerbsPlantPage {
  private submitRequested: boolean;
  public f: FormGroup;
  public shownData: string[];
  public Plant: string[];
  private formDatAgiculture$ = this.store.select(getArraySkipPageAgiculture).pipe(map(s => s));
  private itAgi: any;
  private formDataG1_G4$ = this.store.select(getArraySkipPage).pipe(map(s => s));
  private itG1_G4: any;
  private formCheckPlumbing$ = this.store.select(getCheckWaterPlumbing).pipe(map(s => s));
  private itPlumbing: any;
  private formDataUnit$ = this.store.select(getDataOfUnit)
  private formData$: any;
  private GetPlantDrycrop$ = this.store.select(getAgronomyPlantSelectPlant);
  private GetPlantPerennial$ = this.store.select(getPerennialPlantSelectPlant);
  private GetPlantRice$ = this.store.select(getRicePlantSelectPlant);
  private GetPlantRubber$ = this.store.select(getRubberTreeSelectPlant);
  private getAgiSelectRice$ = this.store.select(getAgiSelectRice);
  private getAgiSelectAgronomy$ = this.store.select(getAgiSelectAgronomy);
  private getAgiSelectRubber$ = this.store.select(getAgiSelectRubber);
  private getAgiSelectPerennial$ = this.store.select(getAgiSelectPerennial);

  public listDryCropData: any = [];
  public listPerenialData: any = [];
  public listRiceData: any = [];
  public listRubberData: any = [];
  public listSumData: any = [];
  public getAgiSelectRice: boolean;
  public getAgiSelectAgronomy: boolean;
  public getAgiSelectRubber: boolean;
  public getAgiSelectPerennial: boolean;
  private frontNum: any;
  private backNum: any;
  @ViewChildren(FieldHerbsPlantComponent) private fieldHerbsPlant: FieldHerbsPlantComponent[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public modalCtrl: ModalController, private store: Store<HouseHoldState>) {
    this.f = this.fb.group({
      'doing': [null, Validators.required],
      'fieldCount': [null, Validators.required],
      'fields': this.fb.array([]),
    });
    this.setupPlantingCountChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HerbsPlantPage');
    this.countNumberPage();
    this.formDataUnit$.subscribe(data => {
      if (data != null) {
        // this.formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.agriculture.herbsPlant));
        this.formData$ = data
        this.f.setValue(data.agriculture.herbsPlant)
      }
    })
    this.GetPlantRice$.subscribe(data => this.listRiceData = data);
    this.GetPlantDrycrop$.subscribe(data => this.listDryCropData = data);
    this.GetPlantRubber$.subscribe(data => this.listRubberData = data);
    this.GetPlantPerennial$.subscribe(data => this.listPerenialData = data);
    this.getAgiSelectRice$.subscribe(data => this.getAgiSelectRice = data);
    this.getAgiSelectAgronomy$.subscribe(data => this.getAgiSelectAgronomy = data);
    this.getAgiSelectRubber$.subscribe(data => this.getAgiSelectRubber = data);
    this.getAgiSelectPerennial$.subscribe(data => this.getAgiSelectPerennial = data);
    var sum = this.listDryCropData.concat(this.listPerenialData).concat(this.listRiceData).concat(this.listRubberData)
    this.listSumData = sum;
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.fieldHerbsPlant.forEach(it => it.submitRequest());
    let fields = this.f.get('fields').value as Array<any>;
    let selectedMap = new Map<string, any>();
    fields.forEach(f => {
      if (f.plantings && f.plantings.plants) {
        f.plantings.plants.forEach(p => selectedMap.set(p.code, p));
      }
    });
    let selected = [];
    selectedMap.forEach(v => selected.push(v));
    // this.store.dispatch(new SetNextPageDirection(7));
    this.formData$.agriculture.herbsPlant = this.f.value
    if (this.f.valid || (this.f.get('doing').value == false)) {
      this.arrayIsCheckMethod();
      this.store.dispatch(new LoadHouseHoldSample(this.formData$));
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
    this.store.dispatch(new SetSelectorIndex(6));
    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: Array<number>;
    arrayIsCheck$.subscribe(data => {
      if (data != null) {
        arrayIsCheck = data;
        if (arrayIsCheck.every(it => it != 6)) {
          arrayIsCheck.push(6);
        }
        console.log(arrayIsCheck);
      }
    });
  }

  private checkNextPage() {
    this.formDataG1_G4$.subscribe(data => {
      if (data != null) {
        this.itG1_G4 = data;
      }
      console.log("itG1_G4: ", this.itG1_G4);
    });
    this.formDatAgiculture$.subscribe(data => {
      if (data != null) {
        this.itAgi = data;
      }
      console.log("it: ", this.itAgi);
    });
    if (this.itAgi.flowerCrop) {
      this.navCtrl.push("FlowerCropPage")
    }
    else if (this.itAgi.mushroomPlant) {
      this.navCtrl.push("MushroomPage")
    }
    else if (this.itAgi.animalFarm) {
      this.navCtrl.push("AnimalFarmPage")
    }
    else if (this.itAgi.aquaticAnimals) {
      this.navCtrl.push("WaterAnimalPlantingPage")
    }
    else if (this.itG1_G4.isFactorial) {
      this.navCtrl.push("FactorialPage")
    }
    else if (this.itG1_G4.isCommercial) {
      this.navCtrl.push("CommercialPage")
    }
    else {
      this.formCheckPlumbing$.subscribe(data => {
        if (data != null) {
          this.itPlumbing = data;
        }
        console.log("itPlumbing: ", this.itPlumbing);
      });
      if (this.itPlumbing) {
        this.navCtrl.push("PlumbingPage")
      }
      else {
        this.navCtrl.push("GroundWaterPage")
      }
    }
  }

  public isValid(name: string): boolean {
    var ctrl = this.f.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }

  private setupPlantingCountChanges() {
    const componentFormArray: string = "fields";
    const componentCount: string = "fieldCount";

    var onComponentCountChanges = () => {
      var fields = (this.f.get(componentFormArray) as FormArray).controls || [];
      var fieldCount = this.f.get(componentCount).value || 0;
      var farr = this.fb.array([]);

      fieldCount = Math.max(1, fieldCount);

      for (let i = 0; i < fieldCount; i++) {
        var ctrl = null;
        if (i < fields.length) {
          const fld = fields[i];
          ctrl = fld;
        } else {
          ctrl = FieldHerbsPlantComponent.CreateFormGroup(this.fb);
        }

        farr.push(ctrl);
      }
      this.f.setControl(componentFormArray, farr);
    };

    this.f.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

}
