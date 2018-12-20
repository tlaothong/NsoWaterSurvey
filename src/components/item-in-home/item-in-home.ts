import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'item-in-home',
  templateUrl: 'item-in-home.html'
})
export class ItemInHomeComponent {

  @Input() public FormItem: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder) {
    this.FormItem = ItemInHomeComponent.CreateFormGroup(this.fb);
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      "ea": [null],
      "ordering": [null],
      "road": [null],
      "alley": [null],
      "name": [null],
      "houseNo": [null],
      "latitude": [null],
      "longitude": [null],
      "buildingType": [null],
      "other": [null],
      "access": [null],
      "vacancyCount": [null],
      "abandonedCount": [null],
      "unitCount": [null],
      "unitAccess": [null],
      "vacantRoomCount": [null],
      "occupiedRoomCount": [null],
      "waterQuantity": fb.group({
        "waterQuantity": [null],
        "cubicMeterPerMonth": [null],
        "waterBill": [null]
      }),
      "floorCount": [null],
      "comments": fb.array([]),
      "recCtrl": fb.group({
        "createdDateTime": [null],
        "lastModified": [null],
        "deletedDateTime": [null],
        "lastUpload": [null],
        "lastDownload": [null],
        "logs": fb.array([])
      }),
      "_id": [null]
    });
  }

  goBuildingInfo() {
    this.navCtrl.push("BuildingInformation1Page")
  }

}
