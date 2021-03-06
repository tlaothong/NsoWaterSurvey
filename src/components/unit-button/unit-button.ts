import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ModalController, NavController, AlertController, NavParams, PopoverController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { BuildingState } from '../../states/building/building.reducer';
import { HouseHoldState } from '../../states/household/household.reducer';
import { getHouseHoldSample, getUnitByIdBuilding } from '../../states/household';
import { LoadHouseHoldSample, SetUnitNo } from '../../states/household/household.actions';
import { Guid } from "guid-typescript";
import { Storage } from '@ionic/storage';
import { UnitButtonPopoverComponent } from '../unit-button-popover/unit-button-popover';
import { AppStateProvider } from '../../providers/app-state/app-state';

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
  @Input("unitCount") public unitCount: number;
  @Input('no') public unitNo: string;
  @Input() public FormItem: FormGroup;
  id_BD: any;

  private submitRequested: boolean;
  public dataS: any;

  public access: number;
  public comment = '';
  public allComment = '';

  public index: number;
  public class = "play";
  public roomNumber = '';

  public fgac: FormArray;
  public fgcm: FormArray;



  private GetUnitByIdBuilding$ = this.store.select(getUnitByIdBuilding);
  private formData$ = this.store.select(getHouseHoldSample);


  constructor(private modalCtrl: ModalController, private storage: Storage,
    public navParams: NavParams, public navCtrl: NavController, public alertCtrl: AlertController,
    private store: Store<HouseHoldState>, private storeBuild: Store<BuildingState>, private fb: FormBuilder,
    private popoverCtrl: PopoverController, private appState: AppStateProvider
  ) {
    console.log('Hello UnitButtonComponent Component');
    this.text = '';
  }

  ngOnInit() {
    this.FormItem = UnitButtonComponent.CreateFormGroup(this.fb);
    this.GetUnitByIdBuilding$.subscribe(data => {
      console.log("dataxxxxxx");
      console.log(data);

      if (data != null) {
        if (data[Number(this.unitNo) - 1] != undefined) {
          let count = data[Number(this.unitNo) - 1].subUnit.accessCount;
          this.FormItem.get('subUnit.accessCount').setValue(count);
          this.setupAccessCountChanges();
          this.setupAccessCountChangesForComments();
          this.setupCountChangesForLogs();
          this.FormItem.patchValue(data[Number(this.unitNo) - 1]);
          console.log(this.FormItem.value);
          if (this.unitCount > 1) {
            this.setAccess();
          }
        }
      }
    });
    if (this.unitCount == 1) {
      this.FormItem.controls['buildingId'].setValue(this.appState.buildingId);
      this.storage.get(this.appState.buildingId).then((val) => {
        console.log(val);
        if (val != null) {
          let dataListHH = val[0];
          console.log(dataListHH);
          this.store.dispatch(new LoadHouseHoldSample(dataListHH));
        } else {
          console.log(this.FormItem.value);
          this.FormItem.get('_id').setValue(Guid.create().toString());
          this.store.dispatch(new LoadHouseHoldSample(this.FormItem.value));
        }
        this.setUnitNo();
        this.navCtrl.push('WaterActivityUnitPage', { FormItem: this.FormItem, unitCount: this.unitCount });
      });
    } else {
      this.setupAccessCountChanges();
      this.setupAccessCountChangesForComments();
      this.setupCountChangesForLogs();
      this.FormItem.get('_id').setValue(Guid.create().toString());

      console.log(this.FormItem.value);
      if (this.FormItem.get('subUnit.accessCount').value > 0) {
        this.setAccess();
      }
    }
  }

  setUnitNo() {
    this.store.dispatch(new SetUnitNo(this.unitNo));
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      '_id': [null, Validators.required],
      'ea': [null, Validators.required],
      'buildingId': [null, Validators.required],
      'subUnit': fb.group({
        'roomNumber': [null, Validators.required],
        'accessCount': [0, Validators.required],
        'accesses': fb.array([0]),
        'hasPlumbing': [null, Validators.required],
        'hasPlumbingMeter': [null, Validators.required],
        'isPlumbingMeterXWA': [null, Validators.required],
        'hasGroundWater': [null, Validators.required],
        'hasGroundWaterMeter': [null, Validators.required],
      }),
      'isHouseHold': [null, Validators.required],
      'isAgriculture': [null, Validators.required],
      'isFactorial': [null, Validators.required],
      'isCommercial': [null, Validators.required],
      'comments': fb.array([]),
      'status': null,
      'residence': fb.group({
        'memberCount': null,
        'workingAge': null,
        'waterSources': fb.group({
          'plumbing': false,
          'underGround': false,
          'pool': false,
          'river': false,
          'irrigation': false,
          'rain': false,
          'rainingAsIs': false,
          'buying': false,
          'hasOther': false,
          'other': null,
        }),
        'gardeningUse': null
      }),
      'agriculture': fb.group({
        'ricePlant': fb.group({
          'doing': false,
          'fieldCount': 0,
          'fields': fb.array([]),
        }),
        'agronomyPlant': fb.group({
          'doing': false,
          'fieldCount': 0,
          'fields': fb.array([]),
        }),
        'rubberTree': fb.group({
          'doing': false,
          'fieldCount': 0,
          'fields': fb.array([]),
        }),
        'perennialPlant': fb.group({
          'doing': false,
          'fieldCount': 0,
          'fields': fb.array([]),
        }),
        'herbsPlant': fb.group({
          'doing': false,
          'fieldCount': 0,
          'fields': fb.array([]),
        }),
        'flowerCrop': fb.group({
          'doing': false,
          'fieldCount': 0,
          'fields': fb.array([]),
        }),
        'mushroomPlant': fb.group({
          'doing': false,
          'fieldCount': 0,
          'fields': fb.array([]),
        }),
        'animalFarm': fb.group({
          'doing': false,
          'cow': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'buffalo': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'pig': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'goat': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'sheep': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'chicken': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'duck': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'goose': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'silkWool': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'other': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'waterSources': fb.group({
            'plumbing': false,
            'underGround': false,
            'pool': false,
            'river': false,
            'irrigation': false,
            'rain': false,
            'rainingAsIs': false,
            'buying': false,
            'hasOther': false,
            'other': null,
          }),
        }),
        'aquaticAnimals': fb.group({
          'doing': false,
          'isFish': false,
          'fish': fb.group({
            'doing': null,
            'depression': false,
            'gardenGroove': false,
            'stew': false,
            'riceField': false,
            'hasOther': false,
            'other': null,
            'fieldCount': 0,
            'fieldsAreSameSize': null,
            'fields': fb.array([]),
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
          'isShrimp': false,
          'shrimp': fb.group({
            'doing': null,
            'depression': false,
            'gardenGroove': false,
            'stew': false,
            'riceField': false,
            'hasOther': false,
            'other': null,
            'fieldCount': 0,
            'fieldsAreSameSize': null,
            'fields': fb.array([]),
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
          'isFrog': false,
          'frog': fb.group({
            'doing': null,
            'depression': false,
            'stew': false,
            'other': null,
            'hasOther': false,
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
          'isCrocodile': false,
          'crocodile': fb.group({
            'doing': null,
            'depression': false,
            'hasOther': false,
            'other': null,
            'fieldCount': 0,
            'fieldsAreSameSize': null,
            'fields': fb.array([]),
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
          'isSnappingTurtle': false,
          'snappingTurtle': fb.group({
            'doing': null,
            'depression': false,
            'hasOther': false,
            'other': null,
            'fieldCount': 0,
            'fieldsAreSameSize': null,
            'fields': fb.array([]),
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
          'isCrab': false,
          'crab': fb.group({
            'doing': null,
            'depression': false,
            'gardenGroove': false,
            'stew': false,
            'riceField': false,
            'hasOther': false,
            'other': null,
            'fieldCount': 0,
            'fieldsAreSameSize': null,
            'fields': fb.array([]),
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
          'isShellFish': false,
          'shellFish': fb.group({
            'doing': null,
            'depression': false,
            'gardenGroove': false,
            'stew': false,
            'riceField': false,
            'hasOther': false,
            'other': null,
            'fieldCount': 0,
            'fieldsAreSameSize': null,
            'fields': fb.array([]),
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
          'isTurtle': false,
          'turtle': fb.group({
            'doing': null,
            'depression': false,
            'hasOther': false,
            'other': null,
            'fieldCount': 0,
            'fieldsAreSameSize': null,
            'fields': fb.array([]),
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
          'isReddish': false,
          'reddish': fb.group({
            'doing': null,
            'depression': false,
            'gardenGroove': false,
            'stew': false,
            'riceField': false,
            'hasOther': false,
            'other': null,
            'fieldCount': 0,
            'fieldsAreSameSize': null,
            'fields': fb.array([]),
            'animalsCount': null,
            'waterSources': fb.group({
              'plumbing': false,
              'underGround': false,
              'pool': false,
              'river': false,
              'irrigation': false,
              'rain': false,
              'rainingAsIs': false,
              'buying': false,
              'hasOther': false,
              'other': null,
            }),
          }),
        })
      }),
      'factory': fb.group({
        'name': null,
        'category': null,
        'workersCount': null,
        'heavyMachine': null,
        'waterSources': fb.group({
          'plumbing': false,
          'underGround': false,
          'pool': false,
          'river': false,
          'irrigation': false,
          'rain': false,
          'rainingAsIs': false,
          'buying': false,
          'hasOther': false,
          'other': null,
        }),
        'hasWasteWaterFromProduction': null,
        'hasWasteWaterTreatment': null,
        'wasteWaterReuse': null
      }),
      'commerce': fb.group({
        'name': null,
        'serviceType': null,
        'buildingCode': 0,
        'questionForAcademy': fb.group({
          'preSchool': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'kindergarten': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'primarySchool': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'highSchool': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'vocational': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'higherEducation': fb.group({
            'hasItem': false,
            'itemCount': null
          }),
          'personnelCount': null
        }),
        'hotelsAndResorts': fb.group({
          'roomCount': null,
          'personnelCount': null
        }),
        'hospital': fb.group({
          'bedCount': null,
          'personnelCount': null
        }),
        'building': fb.group({
          'roomCount': null,
          'occupiedRoomCount': null,
          'personnelCount': null
        }),
        'religious': fb.group({
          'peopleCount': null
        }),
        'otherBuilding': fb.group({
          'personnelCount': null
        }),
        'waterSources': fb.group({
          'plumbing': false,
          'underGround': false,
          'pool': false,
          'river': false,
          'irrigation': false,
          'rain': false,
          'rainingAsIs': false,
          'buying': false,
          'hasOther': false,
          'other': null,
        }),
      }),
      'waterUsage': fb.group({
        "plumbing": fb.group({
          'mwa': fb.group({
            'doing': null,
            'qualityProblem': fb.group({
              'hasProblem': null,
              'problem': fb.group({
                'turbidWater': false,
                'saltWater': false,
                'smell': false,
                'filmOfOil': false,
                'fogWater': false,
                'hardWater': false,
              })
            }),
            'plumbingUsage': fb.group({
              'waterQuantity': 0,
              'cubicMeterPerMonth': null,
              'waterBill': null
            })
          }),
          'pwa': fb.group({
            'doing': null,
            'qualityProblem': fb.group({
              'hasProblem': null,
              'problem': fb.group({
                'turbidWater': false,
                'saltWater': false,
                'smell': false,
                'filmOfOil': false,
                'fogWater': false,
                'hardWater': false,
              })
            }),
            'plumbingUsage': fb.group({
              'waterQuantity': 0,
              'cubicMeterPerMonth': null,
              'waterBill': null,
            })
          }),
          'other': fb.group({
            'doing': null,
            'qualityProblem': fb.group({
              'hasProblem': null,
              'problem': fb.group({
                'turbidWater': false,
                'saltWater': false,
                'smell': false,
                'filmOfOil': false,
                'fogWater': false,
                'hardWater': false,
              })
            }),
            'plumbingUsage': fb.group({
              'waterQuantity': 0,
              'cubicMeterPerMonth': null,
              'waterBill': null,
            })
          }),
          'waterActivityMWA': fb.group({
            'drink': 0,
            'plant': 0,
            'farm': 0,
            'agriculture': 0,
            'product': 0,
            'service': 0,
          }),
          'waterActivityPWA': fb.group({
            'drink': 0,
            'plant': 0,
            'farm': 0,
            'agriculture': 0,
            'product': 0,
            'service': 0,
          }),
          'waterActivityOther': fb.group({
            'drink': 0,
            'plant': 0,
            'farm': 0,
            'agriculture': 0,
            'product': 0,
            'service': 0,
          }),
          'hasWaterNotRunning': null,
          'waterNotRunningCount': null
        }),
        'groundWater': fb.group({
          'privateGroundWater': fb.group({
            'doing': null,
            'allCount': null,
            'waterResourceCount': 0,
            'waterResources': fb.array([])
          }),
          'publicGroundWater': fb.group({
            'doing': null,
            'waterResourceCount': 0,
            'waterResources': fb.array([])
          })
        }),
        'river': fb.group({
          'hasPump': null,
          'pumpCount': 0,
          'pumps': fb.array([]),
          'waterActivities': fb.group({
            'drink': 0,
            'plant': 0,
            'farm': 0,
            'agriculture': 0,
            'product': 0,
            'service': 0,
          }),
          'qualityProblem': fb.group({
            'hasProblem': null,
            'problem': fb.group({
              'turbidWater': false,
              'saltWater': false,
              'smell': false,
              'filmOfOil': false,
              'fogWater': false,
              'hardWater': false,
            })
          })
        }),
        'pool': fb.group({
          'doing': null,
          'waterResourceCount': 0,
          'waterResources': fb.array([]),
          'poolCount': 0,
          'hasSameSize': true,
          'poolSizes': fb.array([]),
        }),
        'irrigation': fb.group({
          'hasCubicMeterPerMonth': null,
          'cubicMeterPerMonth': null,
          'hasPump': null,
          'pumpCount': 0,
          'pumps': fb.array([]),
          'waterActivities': fb.group({
            'drink': 0,
            'plant': 0,
            'farm': 0,
            'agriculture': 0,
            'product': 0,
            'service': 0,
          }),
          'qualityProblem': fb.group({
            'hasProblem': null,
            'problem': fb.group({
              'turbidWater': false,
              'saltWater': false,
              'smell': false,
              'filmOfOil': false,
              'fogWater': false,
              'hardWater': false,
            })
          })
        }),
        'rain': fb.group({
          'rainContainers': fb.array([
            UnitButtonComponent.createRainContainersForm(fb),
            UnitButtonComponent.createRainContainersForm(fb),
            UnitButtonComponent.createRainContainersForm(fb),
            UnitButtonComponent.createRainContainersForm(fb),
            UnitButtonComponent.createRainContainersForm(fb),
            UnitButtonComponent.createRainContainersForm(fb),
            UnitButtonComponent.createRainContainersForm(fb),
            UnitButtonComponent.createRainContainersForm(fb),
          ]),
          'waterActivities': fb.group({
            'drink': 0,
            'plant': 0,
            'farm': 0,
            'agriculture': 0,
            'product': 0,
            'service': 0,
          }),
        }),
        'buying': fb.group({
          'package': fb.array([{
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }, {
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }, {
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }, {
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }, {
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }, {
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }, {
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }, {
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }, {
            'name': null,
            'size': null,
            'drink': null,
            'agriculture': null,
            'factory': null,
            'service': null,
          }]),
        })
      }),
      'disaster': fb.group({
        'flooded': null,
        'yearsDisasterous': fb.array([{
          'count': null,
          'avgDay': null,
          'avgHour': null,
          'waterHeightCm': null,
          'year': null,
        }, {
          'count': null,
          'avgDay': null,
          'avgHour': null,
          'waterHeightCm': null,
          'year': null,
        }, {
          'count': null,
          'avgDay': null,
          'avgHour': null,
          'waterHeightCm': null,
          'year': null,
        }, {
          'count': null,
          'avgDay': null,
          'avgHour': null,
          'waterHeightCm': null,
          'year': null,
        }, {
          'count': null,
          'avgDay': null,
          'avgHour': null,
          'waterHeightCm': null,
          'year': null,
        }]),
        '_id': null
      }),
      'closing': fb.group({
        'informer': null,
        'factorialCategoryCode': 0,
        'serviceTypeCode': 0,
      }),
      'recCtrl': fb.group({
        'createdDateTime': null,
        'lastModified': null,
        'deletedDateTime': null,
        'lastUpload': null,
        'lastDownload': null,
        'logCount': 0,
        'logs': fb.array([])
      }),
      'population': fb.group({
        'personCount': 0,
        'persons': fb.array([]),
        'allPersonCount': null,
        'malePerson': null,
        'femalePerson': null,
      }),
    });
  }

  public static createRainContainersForm(fb: FormBuilder) {
    return fb.group({
      'category': [null],
      'size': [null],
      'count': [null],
    })
  }

  sendIdUnit() {
    let id = this.FormItem.get('_id').value
    console.log(id);
    this.storage.get(id).then((val) => {
      console.log(val);
      if (val != null) {
        this.dataS = val;
        console.log(val);
        this.store.dispatch(new LoadHouseHoldSample(this.dataS));
      }
    })
  }

  public showUnitButtonPopover(myEvent) {
    let popover = this.popoverCtrl.create(UnitButtonPopoverComponent);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      (data == 'settings') ? this.showModalSetting() : this.deleteUnit(this.FormItem.value);
    });
  }

  public deleteUnit(HH: any) {
    // let id = this.FormItem.get('_id').value;
    // this.storage.remove(id);

    console.log(HH);
    let keyHH = HH._id;
    let keyBD = HH.buildingId;
    this.storage.get(keyBD).then((val) => {
      let BDList = val;
      let index = BDList.findIndex(it => it._id == HH._id);
      BDList.splice(index, 1);
      this.storage.set(keyBD, BDList);
      this.storage.remove(keyHH)
    })
    this.navCtrl.popTo(this.navCtrl.getByIndex(3));
  }

  public showModalSetting() {
    const modal = this.modalCtrl.create("DlgUnitPage", { FormItem: this.FormItem });
    modal.onDidDismiss(data => {
      if (data) {
        var fg = <FormGroup>data;
        this.FormItem.setValue(fg.value);
        this.setAccess();
        let access = this.FormItem.get('subUnit.accesses') as FormArray;
        let lastIndex = access.length - 1;
        if (access.at(lastIndex).value == 1) {
          this.sendIdUnit();
          // this.navCtrl.setRoot(this.navCtrl.getActive().component);
          this.navCtrl.getActive().component;
          this.setUnitNo();
          this.navCtrl.push('WaterActivityUnitPage')
        }
      }
    });
    modal.present();
  }

  public showModal() {
    if (this.access == 1) {
      this.sendIdUnit();
      console.log(this.FormItem);
      this.setUnitNo();
      this.navCtrl.push('WaterActivityUnitPage', { FormItem: this.FormItem });
    }
    else if (this.class == "play" || this.class == "return" || this.class == "returnCm") {

      let count = this.FormItem.get('subUnit.accessCount').value + 1;
      this.FormItem.get('subUnit.accessCount').setValue(count);
      this.setupAccessCountChanges();
      this.setupAccessCountChangesForComments();
      this.setupCountChangesForLogs();

      const modal = this.modalCtrl.create("DlgUnitPage", { FormItem: this.FormItem });
      modal.onDidDismiss(data => {
        if (data) {
          var fg = <FormGroup>data;
          this.FormItem.setValue(fg.value);
          this.setAccess();
          let access = this.FormItem.get('subUnit.accesses') as FormArray;
          let lastIndex = access.length - 1;
          if (access.at(lastIndex).value == 1) {
            this.sendIdUnit();
            // this.navCtrl.setRoot(this.navCtrl.getActive().component);
            this.navCtrl.getActive().component;
            this.setUnitNo();
            this.navCtrl.push('WaterActivityUnitPage', { FormItem: this.FormItem })
          }
        }
        else {
          this.FormItem.get('subUnit.accessCount').setValue(count - 1);
          this.setupAccessCountChanges();
          this.setupAccessCountChangesForComments();
          this.setupCountChangesForLogs();
        }
      });
      modal.present();
    }
  }

  // submitRequest() {
  //   this.submitRequested = true;
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnitButtonComponent');
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.dirty || this.submitRequested);
  }

  private setAccess() {
    this.fgac = this.FormItem.get('subUnit.accesses') as FormArray;
    this.fgcm = this.FormItem.get('comments') as FormArray;
    this.index = this.FormItem.get('subUnit.accessCount').value - 1;
    this.index = (this.index < 0) ? 0 : this.index;
    this.access = this.fgac.at(this.index).value;
    this.comment = this.fgcm.at(this.index).value.text;

    let text = '';
    for (let i = 0; i < this.index + 1; i++) {
      text += (this.fgcm.at(i).value.text != '') ? 'ครั้งที่ ' + (i + 1) + ' : ' + this.fgcm.at(i).value.text + '<br>' : '';
    }
    this.allComment = text;

    this.roomNumber = this.FormItem.get('subUnit.roomNumber').value;
    this.updateStatus();
  }

  private updateStatus() {
    switch (this.access) {
      case 1:
        if (this.FormItem.get('status').value == "complete") {
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
        this.class = (this.allComment == '') ? "empty" : "emptyCm";
        break;
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
      buttons: ['ตกลง']
    });
    alert.present();
  }

  public static CreateComment(fb: FormBuilder): FormGroup {
    return fb.group({
      'at': null,
      'text': [''],
    });
  }

  public static CreateLog(fb: FormBuilder): FormGroup {
    return fb.group({
      'at': null,
      'operationCode': null,
    });
  }

  private setupAccessCountChanges() {
    const componentFormArray: string = "subUnit.accesses";
    const componentCount: string = "subUnit.accessCount";

    var onComponentCountChanges = () => {
      var accesses = (this.FormItem.get(componentFormArray) as FormArray).controls || [];
      var accessCount = this.FormItem.get(componentCount).value || 0;
      var farr = this.fb.array([]);

      accessCount = Math.max(0, accessCount);

      for (let i = 0; i < accessCount; i++) {
        var ctrl = null;
        if (i < accesses.length) {
          const fld = accesses[i];
          ctrl = fld;
        } else {
          ctrl = new FormControl();
        }

        farr.push(ctrl);
      }
      let fgrp = this.FormItem.get('subUnit') as FormGroup;
      fgrp.setControl('accesses', farr);
    };

    this.FormItem.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

  private setupAccessCountChangesForComments() {
    const componentFormArray: string = "comments";
    const componentCount: string = "subUnit.accessCount";

    var onComponentCountChanges = () => {
      var comments = (this.FormItem.get(componentFormArray) as FormArray).controls || [];
      var accessCount = this.FormItem.get(componentCount).value || 0;
      var farr = this.fb.array([]);

      accessCount = Math.max(0, accessCount);

      for (let i = 0; i < accessCount; i++) {
        var ctrl = null;
        if (i < comments.length) {
          const fld = comments[i];
          ctrl = fld;
        } else {
          ctrl = UnitButtonComponent.CreateComment(this.fb);
        }

        farr.push(ctrl);
      }
      this.FormItem.setControl(componentFormArray, farr);
    };

    this.FormItem.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

  private setupCountChangesForLogs() {
    const componentFormArray: string = "recCtrl.logs";
    const componentCount: string = "recCtrl.logCount";

    var onComponentCountChanges = () => {
      var comments = (this.FormItem.get(componentFormArray) as FormArray).controls || [];
      var accessCount = this.FormItem.get(componentCount).value || 0;
      var farr = this.fb.array([]);

      accessCount = Math.max(0, accessCount);

      for (let i = 0; i < accessCount; i++) {
        var ctrl = null;
        if (i < comments.length) {
          const fld = comments[i];
          ctrl = fld;
        } else {
          ctrl = UnitButtonComponent.CreateLog(this.fb);
        }

        farr.push(ctrl);
      }
      (this.FormItem.get('recCtrl') as FormGroup).setControl('logs', farr);
    };

    this.FormItem.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

}
