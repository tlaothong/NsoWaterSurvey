import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the WaterActivity5Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'water-activity5',
  templateUrl: 'water-activity5.html'
})
export class WaterActivity5Component {

  @Input('headline') public text: string;
  @Input() public FormItem: FormGroup;

  constructor(private fb: FormBuilder) {
    console.log('Hello WaterActivity5Component Component');
    this.text = 'Hello World';
    this.FormItem = WaterActivity5Component.CreateFormGroup(fb);
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      'drink': ['', Validators.required],
      'plant': ['', Validators.required],
      'agriculture': ['', Validators.required],
      'product': ['', Validators.required],
      'service': ['', Validators.required]
    });
  }

}
