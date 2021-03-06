import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISubmitRequestable } from '../../shared/ISubmitRequestable';

@Component({
  selector: 'field-area',
  templateUrl: 'field-area.html'
})
export class FieldAreaComponent implements ISubmitRequestable {

  @Input("headline") public text: string;
  @Input("isAnimal") public isAnimal: boolean;
  @Input() public FormItem: FormGroup;
  @Input("checkIsPool") public checkIsPool: boolean;
  private submitRequested: boolean;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.text = '';

    // TODO: Remove this
    this.FormItem = FieldAreaComponent.CreateFormGroup(this.fb);
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      'rai': [null, [Validators.required, Validators.min(0)]],
      'ngan': [null, [Validators.required, Validators.min(0), Validators.max(3)]],
      'sqWa': [null, [Validators.required, Validators.min(0), Validators.max(99)]],
    });
  }

  public showModal() {
    const modal = this.modalCtrl.create("DlgFieldAreaPage",
      {
        FormItem: this.FormItem,
        headline: this.text,
        isAnimal: this.isAnimal,
        checkIsPool: this.checkIsPool
      });
    modal.onDidDismiss(data => {
      if (data) {
        var fg = <FormGroup>data;
        this.FormItem.setValue(fg.value);
      }
    });
    modal.present();
  }

  submitRequest() {
    this.submitRequested = true;
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }

}
