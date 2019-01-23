import { getArrayIsCheck } from './../../states/household/index';
import { SetWaterSourcesResidential, SetNextPageDirection, SetArrayIsCheck } from './../../states/household/household.actions';
import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WaterSources8BComponent } from '../../components/water-sources8-b/water-sources8-b';
import { Store } from '@ngrx/store';
import { HouseHoldState } from '../../states/household/household.reducer';
import { getHouseHoldSample, getWaterSource, getArraySkipPage, getCheckWaterPlumbing } from '../../states/household';
import { map } from 'rxjs/operators';
import { SetResidentialGardeningUse, SetWaterSources, SetCheckWaterPlumbing, SetCheckWaterRiver, SetCheckWaterIrrigation, SetCheckWaterRain, SetCheckWaterBuying, SetWateringResidential } from '../../states/household/household.actions';

@IonicPage()
@Component({
  selector: 'page-residential',
  templateUrl: 'residential.html',
})
export class ResidentialPage {

  private i: any;
  @ViewChildren(WaterSources8BComponent) private waterSources8B: WaterSources8BComponent[];
  public residentialFrm: FormGroup;
  private submitRequested: boolean;
  private formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.residence));
  private formCheckPlumbing$ = this.store.select(getCheckWaterPlumbing).pipe(map(s => s));
  private itPlumbing: any;
  private formDataG1_G4$ = this.store.select(getArraySkipPage).pipe(map(s => s));
  private itG1_G4: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private store: Store<HouseHoldState>) {
    this.residentialFrm = this.fb.group({
      'memberCount': [null, Validators.required],
      'workingAge': [null, Validators.required],
      'waterSources': WaterSources8BComponent.CreateFormGroup(this.fb),
      'gardeningUse': [null, Validators.required],
    });
  }

  ionViewDidLoad() {
    this.formData$.subscribe(data => this.residentialFrm.setValue(data));
    this.i = this.navParams.get('i');
  }

  public handleSubmit() {
    this.submitRequested = true;
    this.waterSources8B.forEach(it => it.submitRequest());
    this.store.dispatch(new SetResidentialGardeningUse(this.residentialFrm.get('gardeningUse').value));
    // this.store.dispatch(new SetWaterSources([(this.residentialFrm.get('waterSources.plumbing').value),
    // (this.residentialFrm.get('waterSources.underGround').value),
    // (this.residentialFrm.get('waterSources.river').value),
    // (this.residentialFrm.get('waterSources.pool').value),
    // (this.residentialFrm.get('waterSources.irrigation').value),
    // (this.residentialFrm.get('waterSources.rain').value),
    // (this.residentialFrm.get('waterSources.buying').value)]));
    this.store.dispatch(new SetWaterSourcesResidential(this.residentialFrm.get('waterSources').value));

    console.log("gardeningUse", this.residentialFrm.get('gardeningUse').value);
    console.log("waterRes", this.residentialFrm.get('waterSources').value);
    // this.store.dispatch(new SetNextPageDirection(1));
    this.arrayIsCheckMethod();
    // this.store.dispatch(new SetArrayIsCheck(arrayIsCheck));
    this.dispatchWaterSource();
    // this.checkNextPage();
    // this.navCtrl.pop();
    this.i++;
    this.navCtrl.setRoot("CheckListPage", { i: this.i });
    // this.navCtrl.pop();
    // this.checkNextPageWaterSounces();
  }

  arrayIsCheckMethod() {
    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: Array<number>;
    arrayIsCheck$.subscribe(data => {
      if (data != null) {
        arrayIsCheck = data;
        arrayIsCheck.push(0);
        console.log(arrayIsCheck);
      }
    });
  }

  private dispatchWaterSource() {
    if (this.residentialFrm.get('waterSources.plumbing').value) {
      this.store.dispatch(new SetCheckWaterPlumbing(this.residentialFrm.get('waterSources.plumbing').value));
    }
    if (this.residentialFrm.get('waterSources.river').value) {
      this.store.dispatch(new SetCheckWaterRiver(this.residentialFrm.get('waterSources.river').value));
    }
    if (this.residentialFrm.get('waterSources.irrigation').value) {
      this.store.dispatch(new SetCheckWaterIrrigation(this.residentialFrm.get('waterSources.irrigation').value));
    }
    if (this.residentialFrm.get('waterSources.rain').value) {
      this.store.dispatch(new SetCheckWaterRain(this.residentialFrm.get('waterSources.rain').value));
    }
    if (this.residentialFrm.get('waterSources.buying').value) {
      this.store.dispatch(new SetCheckWaterBuying(this.residentialFrm.get('waterSources.buying').value));
    }
    if (this.residentialFrm.get('gardeningUse').value) {
      this.store.dispatch(new SetWateringResidential(this.residentialFrm.get('gardeningUse').value));
    }
  }

  private checkNextPage() {
    this.formDataG1_G4$.subscribe(data => {
      if (data != null) {
        this.itG1_G4 = data;
      }
      console.log("itG1_G4: ", this.itG1_G4);
    });
    if (this.itG1_G4.isAgriculture) {
      this.navCtrl.push("AgriculturePage")
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
    var ctrl = this.residentialFrm.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }
}
