import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'table-population',
  templateUrl: 'table-population.html'
})
export class TablePopulationComponent {

  @Input('no') public personNo: string;
  @Input() public FormItem: FormGroup;
  // @Input('nameTitle') public nameTitle: FormGroup;
  private submitRequested: boolean;

  constructor(public modalCtrl: ModalController, public fb: FormBuilder, public navParams: NavParams) {
    this.FormItem = TablePopulationComponent.CreateFormGroup(fb);
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    var fg = fb.group({
      'nameTitle': [null, Validators.required],
      'otherTitle': [null],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'relationship': [null, Validators.required],
      'sex': [null, Validators.required],
      'age': [null, Validators.required],
      'birthDate': [null, Validators.required],
      'birthMonth': [null, Validators.required],
      'birthYear': [null, Validators.required],
      'nationality': [null, Validators.required],
      'registration': [null, Validators.required],
      'otherProvince': [null],
    });
    return fg

  }

  presentModal() {
    const modal = this.modalCtrl.create("DlgPopulationPage",
      {
        FormItem: this.FormItem,
        iTitle: this.personNo
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
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }

}