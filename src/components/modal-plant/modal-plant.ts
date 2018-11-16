import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SearchDropdownPage } from '../../pages/search-dropdown/search-dropdown';
import { ISubmitRequestable } from '../../shared/ISubmitRequestable';
import { Store } from '@ngrx/store';
import { HouseHoldState } from '../../states/household/household.reducer';
import { SetPlant } from '../../states/household/household.actions';
import { getPlant } from '../../states/household';

/**
 * Generated class for the ModalPlantComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-plant',
  templateUrl: 'modal-plant.html'
})
export class ModalPlantComponent implements ISubmitRequestable {


  @Input() InputList;
  @Input() InputLimit;
  @Input() Title;
  @Input() public FormItem: FormGroup;

  private submitRequested: boolean;
  shownData: string[];
  text: string;
  Plant:string[];
  private dataPlant$ = this.store.select(getPlant);

  constructor(public modalCtrl: ModalController, public fb: FormBuilder, private store: Store<HouseHoldState>) {

    this.FormItem = ModalPlantComponent.CreateFormGroup(this.fb);
    // console.log("dddd",JSON.stringify(this.FormItem.value))
  }

  // public static CreateFormArray(fb: FormBuilder, count: number): FormArray {
  //   var arr = [];
  //   for (var i = 0; i < count; i++) {
  //     arr.push({
  //       "code": [null],
  //       "name": [null]
  //     });
  //   }
  //   return fb.array(arr);
  // }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    var fg = fb.group(
      {
        'plantingCount': [null],
        'plants': fb.array([])
      },
    );
    ModalPlantComponent.setupPlantCountChanges(fb, fg);
    return fg;

  }

  model() {

    const modal = this.modalCtrl.create("SearchDropdownPage",
      { title: this.Title, selected: [], list: this.InputList, limit: this.InputLimit });
    modal.onDidDismiss(data => {
      if (data) {
        var adata = data as Array<string>;
        var arr = [];
        adata.forEach(values => {
          arr.push({
            "code":values.split(".")[0],
            "name":values.split(".")[1]
          })
        });
        this.shownData = arr;
        // this.shownData = adata.map(it => it.split("."));
      }
    });
    modal.present();
    
  }

  private static setupPlantCountChanges(fb: FormBuilder, fg: FormGroup) {
    const componentFormArray: string = "plants";
    const componentCount: string = "plantingCount";

    var onComponentCountChanges = () => {
      var plants = (fg.get(componentFormArray) as FormArray).controls || [];
      var plantCount = fg.get(componentCount).value || 0;
      var farr = fb.array([]);

      plantCount = Math.max(0, plantCount);

      for (let i = 0; i < plantCount; i++) {
        var ctrl = null;
        if (i < plants.length) {
          const fld = plants[i];
          ctrl = fld;
        } else {
          ctrl = SearchDropdownPage.CreateFormGroup(fb);
        }
        farr.push(ctrl);
      }
      fg.setControl(componentFormArray, farr);
    };

    fg.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

}
