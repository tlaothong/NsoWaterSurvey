import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ModalController, Form, NavController, AlertController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { BuildingState } from '../../states/building/building.reducer';
import { HouseHoldState } from '../../states/household/household.reducer';

/**
 * Generated class for the UnitButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'unit-button',
  templateUrl: 'unit-button.html'
})
export class UnitButtonComponent {

  @Input() forwardFormData$: any;
  @Input("headline") public text: string;
  @Input('no') public unitNo: string;
  @Input() public FormItem: FormGroup;

  private submitRequested: boolean;
  // private formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s));

  public access: number;
  public comment = '';
  public allComment = '';

  public index: number;
  public class = "play";
  public roomNumber = '';

  public fgac: FormArray;
  public fgcm: FormArray;


  constructor(private modalCtrl: ModalController, public navCtrl: NavController, public alertCtrl: AlertController, private store: Store<HouseHoldState>, private storeBuild: Store<BuildingState>, private fb: FormBuilder) {
    console.log('Hello UnitButtonComponent Component');
    this.text = '';
    this.FormItem = UnitButtonComponent.CreateFormGroup(this.fb);
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      '_id': [null, Validators.required],
      'ea': [null, Validators.required],
      'buildingId': [null, Validators.required],
      'subUnit': fb.group({
        'roomNumber': [null, Validators.required],
        'accessCount': [0],
        'accesses': fb.array([{
          'access': [null],
        },
        {
          'access': [null],
        },
        {
          'access': [null],
        },
        ]),
        'hasPlumbing': [null, Validators.required],
        'hasPlumbingMeter': [false, Validators.required],
        'isPlumbingMeterXWA': [false, Validators.required],
        'hasGroundWater': [null, Validators.required],
        'hasGroundWaterMeter': [false, Validators.required],
      }),
      'isHouseHold': [null, Validators.required],
      'isAgriculture': [null, Validators.required],
      'isFactorial': [null, Validators.required],
      'isCommercial': [null, Validators.required],
      'comments': fb.array([{
        'at': [null],
        'text': [''],
      }, {
        'at': [null],
        'text': [''],
      }, {
        'at': [null],
        'text': [''],
      }]),
      'residence': [null, Validators.required],
      'agriculture': [null, Validators.required],
      'factory': [null, Validators.required],
      'commerce': [null, Validators.required],
      'waterUsage': [null, Validators.required],
      'disaster': [null, Validators.required],
      'closing': [null, Validators.required],
      'recCtrl': [null, Validators.required],
      'population': fb.group({
        'personCount': [null],
        'persons': fb.array([{
          'nameTitle': [null],
          'otherTitle': [null],
          'firstName': [null],
          'lastName': [null],
          'relationship': [null],
          'sex': [null],
          'age': [null],
          'nationality': [null],
          'registration': [null],
          'otherProvince': [null],
        },
        {
          "nameTitle": [null],
          "otherTitle": [null],
          "firstName": [null],
          "lastName": [null],
          "relationship": [null],
          "sex": [null],
          "age": [null],
          "nationality": [null],
          "registration": [null],
          "otherProvince": [null],
        }])
      })
    });
  }

  public showModalSetting() {
    this.FormItem.get('subUnit.accessCount').setValue(this.index);
    const modal = this.modalCtrl.create("DlgUnitPage", { FormItem: this.FormItem });
    modal.onDidDismiss(data => {
      if (data) {
        var fg = <FormGroup>data;
        this.FormItem.setValue(fg.value);
        this.setAccess();
      }
    });
    modal.present();
  }

  public showModal() {
    if (this.access == 1) {
      this.goWaterActivityUnitPage();
    }
    else if (this.class != "complete" && this.class != "completeCm") {
      const modal = this.modalCtrl.create("DlgUnitPage", { FormItem: this.FormItem });
      modal.onDidDismiss(data => {
        if (data) {
          var fg = <FormGroup>data;
          this.FormItem.setValue(fg.value);
          this.setAccess();
        }
      });
      modal.present();
    }
  }

  submitRequest() {
    this.submitRequested = true;
  }

  goWaterActivityUnitPage() {
    this.navCtrl.push('WaterActivityUnitPage');
  }

  ionViewDidEnter() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnitButtonComponent');
    // this.formData$.subscribe(data => this.FormItem.setValue(data));
    // this.DlgUnitPage.forEach(it => it.ionViewDidLoad());
    // console.log('dasdsadsad');
    // console.log(this.FormItem);

  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }

  public static CreateAccess(fb: FormBuilder): FormGroup {
    return fb.group({
      'access': [null, Validators.required],
    });
  }

  public static CreateComment(fb: FormBuilder): FormGroup {
    return fb.group({
      'at': [null],
      'text': [''],
    });
  }

  private setAccess() {
    this.fgac = this.FormItem.get('subUnit.accesses') as FormArray;
    this.fgcm = this.FormItem.get('comments') as FormArray;
    this.index = this.FormItem.get('subUnit.accessCount').value - 1;
    this.access = this.fgac.at(this.index).value.access[0];
    this.comment = this.fgcm.at(this.index).value.text[0];
    this.allComment += (this.fgcm.at(this.index).value.text[0]) ? 'ครั้งที่ ' + (this.index + 1) + ' : ' + this.fgcm.at(this.index).value.text[0] + '<br>' : '';
    this.roomNumber = this.FormItem.get('subUnit.roomNumber').value;
    this.checkAccess();
  }

  private checkAccess() {
    switch (this.access) {
      case 1:
        if (this.FormItem.valid) {
          this.class = (this.allComment == '') ? "complete" : "completeCm";
        }
        else {
          this.class = (this.allComment == '') ? "pause" : "pauseCm";
        }
        break;
      case 2:
      case 3:
        if (this.index < 2) {
          this.class = (this.allComment == '') ? "return" : "returnCm";
        }
        else {
          this.class = (this.allComment == '') ? "complete" : "completeCm";
        }
        break;
      case 4:
      case 5:
        this.class = (this.allComment == '') ? "abandoned" : "abandonedCm";
        break;
      default:
        break;
    }
  }

  showComment() {
    const alert = this.alertCtrl.create({
      title: 'ปัญหา/อุปสรรค',
      subTitle: this.allComment,
      buttons: ['OK']
    });
    alert.present();
  }
}
