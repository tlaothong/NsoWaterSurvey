import { Component, Input, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ISubmitRequestable } from '../../shared/ISubmitRequestable';
import { PumpComponent } from '../pump/pump';
import { WaterActivity6Component } from '../water-activity6/water-activity6';
import { WaterProblem6Component } from '../water-problem6/water-problem6';

@Component({
  selector: 'ground-water-usage-public',
  templateUrl: 'ground-water-usage-public.html'
})
export class GroundWaterUsagePublicComponent implements ISubmitRequestable {

  @Input('no') public text: string;
  @Input('G') public G: boolean;
  @Input() public FormItem: FormGroup;
  @Input('usee') public gardeningUse: boolean;
  @Input('doing') public riceDoing: boolean;
  @Input('commerce') public commerceUse: boolean;
  @Input('factory') public factoryUse: boolean;
  @Input('residence') public residenceUse: boolean;
  @Input('agriculture') public agricultureUse: boolean;
  @Input('activeRes') public activeRes: any;
  @Input('activeWateringRes') public activeWateringRes: any;
  @Input('activRice') public activRice: any;
  @Input('activeAgi') public activeAgi: any;
  @Input('activeFac') public activeFac: any;
  @Input('activeCom') public activeCom: any;
  @ViewChildren(PumpComponent) private pump: PumpComponent[];
  @ViewChildren(WaterActivity6Component) private waterActivity6: WaterActivity6Component[];
  @ViewChildren(WaterProblem6Component) private waterProblem6: WaterProblem6Component[];
  private submitRequested: boolean;

  constructor(private fb: FormBuilder) {
    this.FormItem = PumpComponent.CreateFormGroup(this.fb);
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    var fg = fb.group({
      'hasCubicMeterPerMonth': [null, Validators.required],
      'cubicMeterPerMonth': [null, Validators.required],
      'hasPump': [null, Validators.required],
      'pumpCount': [0, Validators.required],
      'pumps': fb.array([]),
      'waterActivities': WaterActivity6Component.CreateFormGroup(fb),
      'qualityProblem': fb.group({
        'hasProblem': [null, Validators.required],
        'problem': WaterProblem6Component.CreateFormGroup(fb),
      })
    });
    GroundWaterUsagePublicComponent.setupPumpCountChanges(fb, fg);
    return fg;
  }

  public checkValid(): boolean {
    return this.isCheckCubicMeter() && this.isCheckValidwaterAct() && this.isCheckProblem();
  }

  public isCheckCubicMeter(): boolean {
    return (this.FormItem.get('hasCubicMeterPerMonth').valid) ?
      ((this.FormItem.get('hasCubicMeterPerMonth').value) ? this.FormItem.get('cubicMeterPerMonth').valid : this.isCheckPump())
      : false;
  }

  public isCheckPump(): boolean {
    let isCheckPump = this.FormItem.get('pumps').valid
    return (this.FormItem.get('hasPump').value) ?
      (this.FormItem.get('pumpCount').valid && isCheckPump) : this.FormItem.get('hasPump').valid;
  }

  public isCheckValidwaterAct(): boolean {
    let isCheckWaterAct = !this.waterActivity6.some(it => it.isCheck == false);
    // let isCheckWaterAct = this.waterActivity6.find(it => it.totalSum != 100) ? false : true;
    return (this.gardeningUse || this.riceDoing || this.commerceUse || this.factoryUse || this.residenceUse || this.agricultureUse) ?
      isCheckWaterAct : true;
  }

  public isCheckProblem(): boolean {
    return (this.FormItem.get('qualityProblem.hasProblem').value) ?
      this.FormItem.get('qualityProblem.problem').valid : this.FormItem.get('qualityProblem.hasProblem').valid;
  }

  setDefult() {
    // this.FormItem.get('hasPump').setValue(null);
    // this.FormItem.get('pumpCount').setValue(null);
  }

  submitRequest() {
    this.submitRequested = true;
    this.pump.forEach(it => it.submitRequest());
    this.waterProblem6.forEach(it => it.submitRequest());
    this.waterActivity6.forEach(it => it.submitRequest());
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }

  private static setupPumpCountChanges(fb: FormBuilder, fg: FormGroup) {
    const componentFormArray: string = "pumps";
    const componentCount: string = "pumpCount";

    var onComponentCountChanges = () => {
      var pump = (fg.get(componentFormArray) as FormArray).controls || [];
      var pumpCount = fg.get(componentCount).value || 0;
      var p = fb.array([]);

      pumpCount = Math.max(0, pumpCount);

      for (let i = 0; i < pumpCount; i++) {
        var ctrl = null;
        if (i < pump.length) {
          const fld = pump[i];
          ctrl = fld;
        } else {
          ctrl = PumpComponent.CreateFormGroup(fb);
        }

        p.push(ctrl);
      }
      fg.setControl(componentFormArray, p);
    };

    fg.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

}
