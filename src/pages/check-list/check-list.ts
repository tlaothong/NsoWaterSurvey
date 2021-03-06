import { getBackToRoot, getBack } from './../../states/household/index';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HouseHoldState } from '../../states/household/household.reducer';
import { Store } from '@ngrx/store';
import { getNextPageDirection, getArrayIsCheck, getSelectorIndex } from '../../states/household';
import { SetSelectorIndex2, SetBackToRoot, SetBack } from '../../states/household/household.actions';
import { Observable } from 'rxjs';
import { AppStateProvider } from '../../providers/app-state/app-state';


/**
 * Generated class for the CheckListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-check-list',
  templateUrl: 'check-list.html',
})
export class CheckListPage {
  pages: Array<{ title: string, component: any, isCheck: boolean, isShow: boolean }>;
  private index: any;
  private backToRoot: boolean;
  private back: boolean;
  private selectorIndex: number;
  private arrayIsCheck: any[];
  private arrayNextPageForHide: any[];

  private backToRoot$ = this.store.select(getBackToRoot);
  private back$ = this.store.select(getBack);
  private selectorIndex$ = this.store.select(getSelectorIndex);
  private arrayIsCheck$ = this.store.select(getArrayIsCheck);
  private arrayNextPageForHide$ = this.store.select(getNextPageDirection);

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController,
      public navParams: NavParams, private store: Store<HouseHoldState>,
      private appState: AppStateProvider) {
    this.pages = [
      { title: 'ตอนที่ 1 ครัวเรือนอยู่อาศัย', component: "ResidentialPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2 การทำการเกษตร ', component: "AgriculturePage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.1 ข้าว ', component: "RicePage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.2 พืชไร่ ', component: "DryCropPlantingPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.3 ยางพารา', component: "RubberTreePage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.4 พืชยืนต้น ไม้ผล สวนป่า', component: "PerennialPlantingPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.5 พืชผัก สมุนไพร', component: "HerbsPlantPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.6 ไม้ดอก ไม้ประดับ การเพาะพันธุ์ไม้ ', component: "FlowerCropPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.7 เพาะเชื้อและปลูกเห็ด', component: "MushroomPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.8 การเลี้ยงสัตว์เพื่อขายหรือใช้งานเกษตร', component: "AnimalFarmPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 2.9 การเพาะเลี้ยงสัตว์น้ำในพื้นที่น้ำจืด', component: "WaterAnimalPlantingPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 3 การผลิตสินค้า ', component: "FactorialPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 4 การค้าและการบริการ', component: "CommercialPage", isCheck: false, isShow: true },//12
      { title: '5.1 น้้ำประปา ', component: "PlumbingPage", isCheck: false, isShow: true },
      { title: '5.2 น้ำบาดาล ', component: "GroundWaterPage", isCheck: false, isShow: true },
      { title: '5.3 น้ำจากแม่น้ำ/ลำคลอง/แหล่งน้ำสาธารณะ', component: "RiverPage", isCheck: false, isShow: true },
      { title: '5.4 น้ำจากสระน้ำส่วนบุคคล/หนองน้ำ/บึง ', component: "PoolPage", isCheck: false, isShow: true },
      { title: '5.5 น้ำจากชลประทาน', component: "IrrigationPage", isCheck: false, isShow: true },
      { title: '5.6 การกักเก็บน้ำฝน', component: "RainPage", isCheck: false, isShow: true },
      { title: '5.7 น้ำที่ซื้อมาใช้', component: "BuyingPage", isCheck: false, isShow: true },
      { title: 'ตอนที่ 6 ปัญหาอุทกภัย', component: "DisasterousPage", isCheck: false, isShow: true },
      { title: 'แบบข้อมูลประชากร', component: "PopulationPage", isCheck: false, isShow: true },
      { title: 'ข้อมูลพื้นฐานส่วนบุคคล', component: "UserPage", isCheck: false, isShow: true },
    ];
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter CheckListPage');

    Observable.combineLatest(
      this.backToRoot$,
      this.back$,
      this.selectorIndex$,
      this.arrayIsCheck$,
      this.arrayNextPageForHide$
    ).take(1).map(([backToRoot, back, selectorIndex, arrayIsCheck, arrayNextPageForHide]) => {
      return {
        backToRoot: backToRoot,
        back: back,
        selectorIndex: selectorIndex,
        arrayIsCheck: arrayIsCheck,
        arrayNextPageForHide: arrayNextPageForHide
      }
    }).subscribe(p => {
      this.index = p.selectorIndex;
      this.updatePagesStatus(p.arrayIsCheck, p.arrayNextPageForHide);
      this.skipPageMedthod(p.backToRoot, p.back, p.arrayNextPageForHide);
    });
  }

  skipPageMedthod(backToRoot, back, arrayNextPage) {
    if (!backToRoot) {
      back ? this.goBackPage(arrayNextPage) : this.goNextPage(arrayNextPage);
    }
  }

  goNextPage(arrayNextPage) {
    for (let i = this.index + 1; i <= 23; i++) {
      if (arrayNextPage[i]) {
        console.log("goNextPage");
        this.store.dispatch(new SetSelectorIndex2(i));
        console.log("i", i);

        this.navCtrl.push(this.pages[i].component, this.store.dispatch(new SetBackToRoot(false)));
        break;
      }
    }
  }

  goBackPage(arrayNextPage) {
    for (let i = this.index - 1; i >= 0; i--) {
      if (arrayNextPage[i]) {
        console.log("goBackPage");
        this.store.dispatch(new SetSelectorIndex2(i));
        this.store.dispatch(new SetBack(false));
        this.navCtrl.push(this.pages[i].component, this.store.dispatch(new SetBackToRoot(false)));
        break;
      }
    }
  }

  updatePagesStatus(arrayIsCheck, arrayNextPageForHide) {
    if (this.appState && this.appState.houseHoldUnit) {
      const completedSurveys = this.appState.houseHoldUnit.surveyCompleted;
      
      for (let idx = 0; idx < this.pages.length; idx++) {
        const page = this.pages[idx];
        const survey = completedSurveys.find(it => it.name == page.component);

        if (survey) {
          page.isCheck = survey.hasCompleted;
          page.isShow = survey.isNeed;
        } else {
          page.isShow = false;
        }
      }
    }
   
  }

  public openPage(page, index) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.store.dispatch(new SetSelectorIndex2(index));
    this.store.dispatch(new SetBackToRoot(false));
    this.store.dispatch(new SetBack(false));
    this.navCtrl.push(page.component);
  }
}
