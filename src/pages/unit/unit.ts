import { UnitButtonComponent } from './../../components/unit-button/unit-button';
import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BuildingState } from '../../states/building/building.reducer';
import { getRecieveDataFromBuilding } from '../../states/building';

@IonicPage()
@Component({
  selector: 'page-unit',
  templateUrl: 'unit.html',
})
export class UnitPage {

  public f: FormGroup;
  @ViewChildren(UnitButtonComponent) private unitButton: UnitButtonComponent[];
  private GetDataFromBuilding$ = this.storeBuild.select(getRecieveDataFromBuilding);
  private num: number = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storeBuild: Store<BuildingState>, public fb: FormBuilder) {
    this.f = this.fb.group({
      'unitCount': [null],
      'units': this.fb.array([]),
    });
    this.setupUnitsCountChanges();
    
    this.num = this.navParams.get('num');
    console.log("data num", this.num);
    if (this.num == 1) {
      this.navCtrl.push("UnitButtonComponent", { num: 1 });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnitPage');
    this.GetDataFromBuilding$.subscribe(data => this.f.get('unitCount').setValue(data));


  }

  ionViewDidEnter() {
    console.log("enter");
  }

  private setupUnitsCountChanges() {
    const componentFormArray: string = "units";
    const componentCount: string = "unitCount";

    var onComponentCountChanges = () => {
      var units = (this.f.get(componentFormArray) as FormArray).controls || [];
      var unitCount = this.f.get(componentCount).value || 0;
      var farr = this.fb.array([]);

      unitCount = Math.max(0, unitCount);

      for (let i = 0; i < unitCount; i++) {
        var ctrl = null;
        if (i < units.length) {
          const fld = units[i];
          ctrl = fld;
        } else {
          ctrl = UnitButtonComponent.CreateFormGroup(this.fb);
        }

        farr.push(ctrl);
      }
      this.f.setControl(componentFormArray, farr);
    };

    this.f.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

}
