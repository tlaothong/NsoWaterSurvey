import { Component, Input, ViewChildren } from '@angular/core';
import { ISubmitRequestable } from '../../shared/ISubmitRequestable';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { PoolAreaForCommuComponent } from '../pool-area-for-commu/pool-area-for-commu';

@Component({
  selector: 'detail-water-management',
  templateUrl: 'detail-water-management.html'
})
export class DetailWaterManagementComponent implements ISubmitRequestable {

  @ViewChildren(PoolAreaForCommuComponent) private poolAreaCommu: PoolAreaForCommuComponent[];
  @Input() public FormItem: FormGroup;
  @Input('isCommunity') public isCommunity: boolean;
  @Input('no') public fieldNo: string;

  private submitRequested: boolean;

  constructor(public fb: FormBuilder) {
    console.log('Hello DetailWaterManagementComponent Component');
    this.FormItem = DetailWaterManagementComponent.CreateFormGroup(fb);
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      'name': [null, Validators],
      'useForPlumbing': [false, Validators],
      'useForFactory': [false, Validators],
      'useForFarming': [false, Validators],
      'useForService': [false, Validators],
      'useForOther': [false, Validators],
      'other': [null, Validators],
      'projectArea': PoolAreaForCommuComponent.CreateFormGroup(fb),
    }, {
        validator: DetailWaterManagementComponent.checkAnyOrOther()
      });
  }

  submitRequest() {
    this.submitRequested = true;
    this.poolAreaCommu.forEach(it => it.submitRequest());
    console.log(this.FormItem.get('projectArea'));

  }

  public static checkAnyOrOther(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const useForPlumbing = c.get('useForPlumbing');
      const useForFactory = c.get('useForFactory');
      const useForFarming = c.get('useForFarming');
      const useForService = c.get('useForService');
      const useForOther = c.get('useForOther');
      const other = c.get('other');
      const name = c.get('name');

      if (name.value == null) {
        return { 'name': true };
      }
      if (!useForPlumbing.value && !useForFactory.value && !useForFarming.value && !useForOther.value && !useForService.value && !other.value) {
        return { 'anycheck': true };
      } else if (useForOther.value == true && (!other.value || other.value.trim() == '')) {
        return { 'other': true };
      }

      return null;
    }
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);

    if (name == 'anycheck') {
      ctrl = this.FormItem;
      return ctrl.errors && ctrl.errors.anycheck && (ctrl.dirty || this.submitRequested);
    } else if (name == 'other') {
      return this.FormItem.errors && this.FormItem.errors.other && (ctrl.dirty || this.submitRequested);
    }
    if (name == 'name') {
      let ctrls = this.FormItem
      return ctrls.errors && ctrls.errors.name && (ctrl.dirty || this.submitRequested);
    }
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }

}
