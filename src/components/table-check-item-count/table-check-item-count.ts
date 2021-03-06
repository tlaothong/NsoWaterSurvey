import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, ValidatorFn, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { ISubmitRequestable } from '../../shared/ISubmitRequestable';

@Component({
  selector: 'table-check-item-count',
  templateUrl: 'table-check-item-count.html'
})
export class TableCheckItemCountComponent implements ISubmitRequestable {

  @Input("ititle") public text: string;
  @Input('unit') public unittext: string;
  @Input() public FormItem: FormGroup;
  private submitRequested: boolean;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    this.text = 'Hello World';

    // TODO: Remove this
    this.FormItem = TableCheckItemCountComponent.CreateFormGroup(this.fb)
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    var fg = fb.group({
      'hasItem': [null],
      'itemCount': [null, Validators.compose([Validators.pattern('[0-9]*'), Validators.min(1)])],
    });
    return fg;
  }

  public showModal() {
    let hasItem = this.FormItem.get('hasItem').value;
    this.FormItem.get('hasItem').setValue(!hasItem);
    const modal = this.modalCtrl.create("DlgTableCheckItemCountPage",
      {
        FormItem: this.FormItem,
        iTitle: this.text,
        unit: this.unittext,
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


  public static checkAnyOrOther(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const hasItem = c.get('hasItem');
      if (!hasItem.value) {
        return { 'anycheck': true };
      }
      return null;
    }
  }

}