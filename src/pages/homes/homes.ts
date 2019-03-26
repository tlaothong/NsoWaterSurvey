import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { QuestionnaireHomeComponent } from '../../components/questionnaire-home/questionnaire-home';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { LoggingState } from '../../states/logging/logging.reducer';
import { LoadHomeBuilding, DeleteHomeBuilding, LoadCommunity, LoadCommunityForEdit, LoadCommunityForEditSuccess } from '../../states/logging/logging.actions';
import { getHomeBuilding, getStoreWorkEaOneRecord, getLoadCommunity, getLoadCommunityForEdit } from '../../states/logging';
import { SwithStateProvider } from '../../providers/swith-state/swith-state';
import { BuildingState } from '../../states/building/building.reducer';
import { SetRecieveDataFromBuilding, SaveBuilding, NewBuilding, DeleteBuilding, SetCurrentWorkingBuilding } from '../../states/building/building.actions';
import { Storage } from '@ionic/storage';
import { LoadUnitByIdBuildingSuccess } from '../../states/household/household.actions';
import { shiftInitState } from '@angular/core/src/view';
import { BootupState } from '../../states/bootup/bootup.reducer';
import { getCurrentWorkingEA } from '../../states/bootup';
import { AppStateProvider } from '../../providers/app-state/app-state';
import { getBuildingList } from '../../states/building';
import { BuildingInList } from '../../models/mobile/MobileModels';



@IonicPage()
@Component({
  selector: 'page-homes',
  templateUrl: 'homes.html',
})
export class HomesPage {
  data: any;
  formItem: FormGroup;
  office: string = "building";
  x: number = 0;
  // public dataEa: any;
  public datap: any[];
  // public dataWorkEARow: any;
  public str: string;
  public comunity: any;
  // public num: string = "1";
  public listFilter: any;
  private DataStoreWorkEaOneRecord$ = this.storeLogging.select(getStoreWorkEaOneRecord);
  private dataBuilding$ = this.storeLogging.select(getHomeBuilding);
  private dataCommunity$ = this.storeLogging.select(getLoadCommunity);
  private dataCommunity: any;
  public statusEa: any = 1;

  public currentEA$ = this.store.select(getCurrentWorkingEA);
  public buildings$ = this.storeBuild.select(getBuildingList);
  public buildingList$ = this.buildings$;
  public buildingListAll$;
  public buildingListRecentlyUse$;
  public buidlingListPaused$;
  public buildingListRevisit$;

  public listMode: string = "recent";

  constructor(public loadingCtrl: LoadingController, private fb: FormBuilder, private storage: Storage, 
      public alertController: AlertController, public navCtrl: NavController, 
      public navParams: NavParams, private popoverCtrl: PopoverController, 
      private store: Store<BootupState>, private storeLogging: Store<LoggingState>, 
      private swith: SwithStateProvider, private storeBuild: Store<BuildingState>, 
      private appState: AppStateProvider) {
    this.initializeItems();
    this.switchListMode();
    console.log('User Id: ' + this.appState.userId);
    console.log('EA Code: ' + this.appState.eaCode);
  }

  public showQuickMenu(myEvent) {
    let popover = this.popoverCtrl.create(QuestionnaireHomeComponent);
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidEnter() {
    // this.store.dispatch(new LoadUnitByIdBuildingSuccess(null));
    // this.DataStoreWorkEaOneRecord$.subscribe(data => {
    //   if (data != null) {
    //     this.dataWorkEARow = data
    // this.statusEa = data.properties.ea_type;
    // console.log(this.dataWorkEARow);
    // console.log(this.statusEa);

    // this.str = data._id.substring(1, 7);
    // console.log(this.str);

    // this.store.dispatch(new SetIdEaWorkHomes(this.str));
    //   }
    // });

    let eaCode = this.appState.eaCode;

    this.storage.get("CL" + eaCode).then((val) => {
      if (val != null) {
        this.dataCommunity = val
        console.log(this.dataCommunity);
      }
    })
  }
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "กรุณารอสักครู่...",
      duration: 2000
    });
    loader.present();
  }

  changeEaStatus() {
    this.statusEa = 2
    console.log(this.statusEa);
  }

  // TODO: Will be handled this
  initializeItems() {
    // this.listFilter = this.dataEa;
    this.buildingListAll$ = this.buildings$;
    this.buildingListRecentlyUse$ = this.buildings$.map(lst => lst.sort(it => -it.buildingId));
    this.buildingListRevisit$ = this.buildings$.map(lst => lst.filter(it => it.status == "refresh"));
    this.buidlingListPaused$ = this.buildings$.map(lst => lst.filter(it => it.status == "pause"));
  }

  switchListMode() {
    switch (this.listMode) {
      case "recent":
        this.buildingList$ = this.buildingListRecentlyUse$;
        break;
      case "paused":
        this.buildingList$ = this.buidlingListPaused$;
        break;
      case "revisit":
        this.buildingList$ = this.buildingListRevisit$;
        break;

      default: // all
        this.buildingList$ = this.buildingListAll$;
        break;
    }
  }

  // changeNum(num: string) {
  //   this.num = num;
  // }

  goBuildingInfo() {
    if (this.office == 'building') {
      // this.storeBuild.dispatch(new SetHomeBuilding(null));
      this.storeBuild.dispatch(new NewBuilding());
      this.navCtrl.push("BuildingInformation1Page", { ea: this.appState.eaCode, id: null })
    } else if (this.office == 'areayoi') {
      let no = (this.dataCommunity) ? (this.dataCommunity.length + 1) : 1;
      this.storeLogging.dispatch(new LoadCommunityForEditSuccess(null));
      this.navCtrl.push("CommunityTestPage", { id: null, no: no.toString() })
    }
  }

  goEditBuildingInfo(item: BuildingInList, no: number) {
    if (this.office == 'building') {
      this.store.dispatch(new SetCurrentWorkingBuilding(item.buildingId));
      this.navCtrl.push('BuildingInformation1Page', { ea: this.appState.eaCode, id: item.buildingId });

      // //this.swith.updateBuildingState(item._id);
      // this.storage.get(item.buildingId).then((val) => {
      //   console.log(val);
      //   this.storeBuild.dispatch(new SaveBuilding(val));
      //   this.navCtrl.push('BuildingInformation1Page', { ea: this.appState.eaCode, id: val._id });
      //   // switch (val.status) {
      //   //   case 'refresh':
      //   //     this.navCtrl.push('BuildingInformation1Page', { ea: this.appState.eaCode, id: val._id });
      //   //     break;
      //   //   case 'pause':
      //   //     this.navCtrl.push("UnitPage");
      //   //     break;
      //   //   default:
      //   //     break;
      //   // }
      // })
    }
    else if (this.office == 'areayoi') {
      console.log(item);
      // this.storage.get(item).then((val) => {
      //   console.log(val);
      //   this.storeLogging.dispatch(new LoadCommunityForEditSuccess(val));
      //   this.navCtrl.push("CommunityTestPage", { no: no.toString() })
      // });
    }
    // this.presentLoading();
  }

  async presentAlertBD(item) {
    const alert = await this.alertController.create({
      title: 'ต้องการจะลบใช่หรือไม่',
      buttons: [
        {
          text: 'ยืนยัน',
          handler: data => {
            this.store.dispatch(new DeleteBuilding(item))
          }
        },
        {
          text: 'ยกเลิก',
          handler: data => {

          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlertCM(id) {
    const alert = await this.alertController.create({
      title: 'ต้องการจะลบใช่หรือไม่',
      buttons: [
        {
          text: 'ยืนยัน',
          handler: data => {
            console.log(id);
            console.log("CL" + this.appState.eaCode);
            this.storage.get("CL" + this.appState.eaCode).then((val) => {
              if (val != null) {
                let list = val
                let index = list.findIndex(it => it._id == id)
                list.splice(index, 1)
                if (val == []) {
                  this.storage.remove("CL" + this.appState.eaCode);
                }
                this.storage.set("CL" + this.appState.eaCode, list)
              }
            });
            this.storage.remove(id);
            this.storage.get("CL" + this.appState.eaCode).then((val) => {
              if (val != null) {
                this.dataCommunity = val
              }
            })
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          }
        },
        {
          text: 'ยกเลิก',
          handler: data => {

          }
        }
      ]
    });
    await alert.present();
  }

  DeleteBuilding(item: any) {
    this.presentAlertBD(item)
  }

  deleteCommu(id: string) {
    this.presentAlertCM(id)
  }

  searchItem(ev) {
    this.initializeItems();

    let val = '';
    if (ev.target && ev.target.value) {
      val = ev.target.value.toLowerCase();
    }
    this.buildingList$ = this.buildingListAll$.map(lst => lst.filter(it =>
      it.name.toLowerCase().indexOf(val) > -1
      || it.houseNo.toLowerCase().indexOf(val) > -1
    ));
  }
}
