import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CrocodileFarmingComponent } from '../../components/crocodile-farming/crocodile-farming';
import { FrogFarmingComponent } from '../../components/frog-farming/frog-farming';
import { FishFarmingComponent } from '../../components/fish-farming/fish-farming';
import { SetSelectorIndex, LoadHouseHoldSample, SetHouseHold } from '../../states/household/household.actions';
import { HouseHoldState } from '../../states/household/household.reducer';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { getHouseHoldSample,  getArrayIsCheck, getNextPageDirection } from '../../states/household';
import { Component, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@IonicPage()
@Component({
  selector: 'page-water-animal-planting',
  templateUrl: 'water-animal-planting.html',
})
export class WaterAnimalPlantingPage {

  @ViewChildren(FishFarmingComponent) private fishFarming: FishFarmingComponent[];
  @ViewChildren(FrogFarmingComponent) private frogFarming: FrogFarmingComponent[];
  @ViewChildren(CrocodileFarmingComponent) private crocodileFarming: CrocodileFarmingComponent[];
  public f: FormGroup;
  private formDataUnit$ = this.store.select(getHouseHoldSample).pipe(map(s => s.agriculture));
  private formData$: any;
  private submitRequested: boolean;
  private frontNum: any;
  private backNum: any;
  constructor(public navCtrl: NavController, private store: Store<HouseHoldState>, public navParams: NavParams, public fb: FormBuilder) {
    this.f = this.fb.group({
      "doing": [null, Validators.required],
      "isFish": [false, Validators.required],
      "fish": FishFarmingComponent.CreateFormGroup(fb),
      "isShrimp": [false, Validators.required],
      "shrimp": FishFarmingComponent.CreateFormGroup(fb),
      "isFrog": [false, Validators.required],
      "frog": FrogFarmingComponent.CreateFormGroup(fb),
      "isCrocodile": [false, Validators.required],
      "crocodile": CrocodileFarmingComponent.CreateFormGroup(fb),
      "isSnappingTurtle": [false, Validators.required],
      "snappingTurtle": CrocodileFarmingComponent.CreateFormGroup(fb),
      "isCrab": [false, Validators.required],
      "crab": FishFarmingComponent.CreateFormGroup(fb),
      "isShellFish": [false, Validators.required],
      "shellFish": FishFarmingComponent.CreateFormGroup(fb),
      "isTurtle": [false, Validators.required],
      "turtle": CrocodileFarmingComponent.CreateFormGroup(fb),
      "isReddish": [false, Validators.required],
      "reddish": FishFarmingComponent.CreateFormGroup(fb),
    }, {
        validator: WaterAnimalPlantingPage.checkAnyOrOther()
      });
  }

  ionViewDidLoad() {
    this.countNumberPage();
    this.formDataUnit$.subscribe(data => {
      if (data != null) {
        this.formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.agriculture.aquaticAnimals));
        this.formData$.subscribe(data =>{
          if(data != null){
            this.f.setValue(data)
          }
        })
      }
    })
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.fishFarming.forEach(it => it.submitRequest());
    this.frogFarming.forEach(it => it.submitRequest());
    this.crocodileFarming.forEach(it => it.submitRequest());
    if (!this.isValid('anycheck') || (this.f.get('doing').value == false)) {
      this.arrayIsCheckMethod();
      // this.store.dispatch(new SetHouseHold(this.f.value));
      this.navCtrl.setRoot("CheckListPage",);
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
    this.store.dispatch(new SetSelectorIndex(10));
    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: Array<number>;
    arrayIsCheck$.subscribe(data => {
      if (data != null) {
        arrayIsCheck = data;
        if (arrayIsCheck.every(it => it != 10)) {
          arrayIsCheck.push(10);
        }
        console.log(arrayIsCheck);
      }
    });
  }

  public isValid(name: string): boolean {
    var ctrl = this.f.get(name);
    if (name == 'anycheck') {
      ctrl = this.f;
      return ctrl.errors && ctrl.errors.anycheck && (ctrl.touched || this.submitRequested);
    }
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }

  public static checkAnyOrOther(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const isFish = c.get('isFish');
      const isShrimp = c.get('isShrimp');
      const isFrog = c.get('isFrog');
      const isSnappingTurtle = c.get('isSnappingTurtle');
      const isCrocodile = c.get('isCrocodile');
      const isCrab = c.get('isCrab');
      const isShellFish = c.get('isShellFish');
      const isTurtle = c.get('isTurtle');
      const isReddish = c.get('isReddish');

      if (!isFish.value && !isShrimp.value && !isFrog.value && !isCrocodile.value && !isCrab.value
        && !isShellFish.value && !isTurtle.value && !isReddish.value && !isSnappingTurtle.value) {
        return { 'anycheck': true };
      }
      return null;
    }
  }
}
