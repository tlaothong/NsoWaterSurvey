import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuestionnaireHomeComponent } from '../../components/questionnaire-home/questionnaire-home';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { LoggingState } from '../../states/logging/logging.reducer';
import { SetIdEaWorkHomes, LoadHomeBuilding, DeleteHomeBuilding, LoadCommunity, LoadCommunityForEdit } from '../../states/logging/logging.actions';
import { getHomeBuilding, getStoreWorkEaOneRecord, getLoadCommunity, getLoadCommunityForEdit } from '../../states/logging';
import { SwithStateProvider } from '../../providers/swith-state/swith-state';
import { BuildingState } from '../../states/building/building.reducer';
import { SetRecieveDataFromBuilding, SetHomeBuilding } from '../../states/building/building.actions';
import { Storage } from '@ionic/storage';
import { LoadUnitByIdBuildingSuccess } from '../../states/household/household.actions';
import { shiftInitState } from '@angular/core/src/view';



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
  public dataEa: any;
  public datap: any[];
  public dataWorkEARow: any;
  public str: string;
  public comunity: any;
  public num: string = "1";
  public listFilter: any;
  private DataStoreWorkEaOneRecord$ = this.store.select(getStoreWorkEaOneRecord);
  private dataBuilding$ = this.store.select(getHomeBuilding);
  private dataCommunity$ = this.store.select(getLoadCommunity);
  private dataCommunity: any;

  constructor(private fb: FormBuilder, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, private popoverCtrl: PopoverController, private store: Store<LoggingState>, private swith: SwithStateProvider, private storeBuild: Store<BuildingState>) {
    this.initializeItems();
  }

  public showQuickMenu(myEvent) {
    let popover = this.popoverCtrl.create(QuestionnaireHomeComponent, {
      data: this.dataWorkEARow,
      str: this.str
    });
    popover.present({
      ev: myEvent
    });
  }

  // setFilteredItems(name) {
  //   this.dataEa = this.dataEa.filter((data) => {
  //     let temp = '';
  //     return temp.toLowerCase().indexOf(name.toLowerCase()) > -1;
  //   });
  // }

  ionViewDidEnter() {
    this.store.dispatch(new LoadUnitByIdBuildingSuccess(null));
    this.DataStoreWorkEaOneRecord$.subscribe(data => {
      if (data != null) {
        this.dataWorkEARow = data
        console.log(this.dataWorkEARow);

        this.str = data._id.substring(1, 7);
        this.store.dispatch(new SetIdEaWorkHomes(this.str));
      }
    });
    // this.store.dispatch(new LoadHomeBuilding(this.dataWorkEARow._id));
    this.store.dispatch(new LoadCommunity(this.dataWorkEARow._id));
    // this.dataBuilding$.subscribe(data => {
    //   if (data != null) {
    //     this.dataEa = data
    //     this.listFilter = this.dataEa;
    //     console.log(this.dataEa)
    //   }
    // });

    this.storage.get(this.dataWorkEARow._id).then((data) => {
      if (data != null) {
        this.dataEa = data
        this.listFilter = this.dataEa;
        console.log(this.dataEa)
      }
    });



    this.dataCommunity$.subscribe(data => {
      if (data != null) {
        this.dataCommunity = data
      }
    });

  }
  filterRefresh(){
    this.storage.get(this.dataWorkEARow._id).then((data) => {
      if (data != null) {
        this.dataEa = data
        this.datap = this.dataEa.filter(it => it.status=="refresh")
        console.log(this.datap);  
        this.listFilter = this.datap;
      }
    });
  }
  filterPause() {
    this.storage.get(this.dataWorkEARow._id).then((data) => {
      if (data != null) {
        this.dataEa = data
        this.datap = this.dataEa.filter(it => it.status=="pause")
        console.log(this.datap);  
        this.listFilter = this.datap;
      }
    });
  }
  totalData(){
    this.storage.get(this.dataWorkEARow._id).then((data) => {
      if (data != null) {
        this.dataEa = data
        this.listFilter = this.dataEa;
        console.log(this.dataEa)
      }
    });
  }

  changeNum(num: string) {
    this.num = num;
  }

  goBuildingInfo() {
    if (this.num == '1') {
      this.swith.updateBuildingState(null);
      this.navCtrl.push("BuildingTestPage", { id: this.dataWorkEARow._id })
    } else if (this.num == '2') {
      this.store.dispatch(new LoadCommunityForEdit(null));
      this.navCtrl.push("CommunityTestPage", { id: null })
    }
  }

  goEditBuildingInfo(item: any) {
    if (this.num == '1' && item.status != 'done-all') {
      this.swith.updateBuildingState(item._id);
      console.log(item);

      this.storage.get(item._id).then((val) => {
        console.log(val);

        this.navCtrl.push("BuildingTestPage", { item: val });
      })
    }
    else if (this.num == '2') {
      this.store.dispatch(new LoadCommunityForEdit(item._id));
      this.navCtrl.push("CommunityTestPage")
    }

  }

  DeleteBuilding(id: string) {
    // this.store.dispatch(new DeleteHomeBuilding(id));
    this.storage.get(this.dataWorkEARow._id).then((data) => {
      if (data != null) {
        let list = data
        let index = list.findIndex(it => it._id == id)
        list.splice(index, 1)
        this.storage.set(this.dataWorkEARow._id, list)
      }
    });
    this.storage.remove(id);
    // this.store.dispatch(new LoadHomeBuilding(this.dataWorkEARow._id));
    this.storage.get(this.dataWorkEARow._id).then((data) => {
      if (data != null) {
        this.dataEa = data
        this.listFilter = this.dataEa;
        console.log(this.dataEa)
      }
    });
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  initializeItems() {
    this.listFilter = this.dataEa;
  }

  searchItem(ev) {
    this.initializeItems();
    // // set val to the value of the ev target
    var val = ev.target.value;
    // // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listFilter = this.dataEa.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1
          || item.houseNo.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
      });
    }
  }
}
