import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HouseHoldState } from '../../states/household/household.reducer';
import { getHouseHoldSample, getFactorialCategory, getCommercialServiceType, getIsFactorial, getIsCommercial, getArrayIsCheck, getSelectorIndex, getNextPageDirection, getDataOfUnit } from '../../states/household';
import { map } from 'rxjs/operators';
import { SetNextPageDirection, SetSelectorIndex } from '../../states/household/household.actions';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public userInfo: FormGroup;
  private submitRequested: boolean;
  private formData$ = this.store.select(getHouseHoldSample).pipe(map(s => s.closing));
  private factorialCategory$ = this.store.select(getFactorialCategory);
  public facCategory: string;
  private commercialServiceType$ = this.store.select(getCommercialServiceType);
  public commercialServiceType: string;
  private facCategoryUse$ = this.store.select(getIsFactorial);
  public facCategoryUse: boolean;
  private  commercialServiceUse$ = this.store.select(getIsCommercial);
  public commercialServiceUse: boolean;
  private frontNum: any;
  private backNum: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private store: Store<HouseHoldState>) {
    this.userInfo = this.fb.group({
      "informer": [null, Validators.required],
      "factorialCategoryCode": [null, Validators.required],
      "serviceTypeCode": [null, Validators.required]
    });
  }

  ionViewDidLoad() {
    this.countNumberPage();
    this.formData$.subscribe(data => this.userInfo.setValue(data));
    this.factorialCategory$.subscribe(data => this.facCategory = data);
    this.commercialServiceType$.subscribe(data => this.commercialServiceType = data);
    this.facCategoryUse$.subscribe(data => this.facCategoryUse = data);
    this.commercialServiceUse$.subscribe(data => this.commercialServiceUse = data);
  }

  ionViewDidEnter() {
  }

  public handleSubmit() {
    this.submitRequested = true;
   
    if (this.userInfo.valid) {
      this.arrayIsCheckMethod();
      this.navCtrl.setRoot("CheckListPage");
      // this.navCtrl.push("PopulationPage");
      }
  }

  countNumberPage() {
    console.log("onSubmit ");
    let arrayNextPage$ = this.store.select(getNextPageDirection).pipe(map(s => s));
    let arrayNextPage: any[];
    arrayNextPage$.subscribe(data => {

      if (data != null) {
        arrayNextPage = data;
        this.backNum = arrayNextPage.length;
      }

    });
    console.log("back",this.backNum);

    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: any[];
    arrayIsCheck$.subscribe(data => {

      if (data != null) {
        arrayIsCheck = data
         this.frontNum = arrayIsCheck.length;
      }

    });
    console.log("frontNum",this.frontNum);
  }

  arrayIsCheckMethod() {
    let selectorIndex$ = this.store.select(getSelectorIndex).pipe(map(s => s));
    let index: any;
    selectorIndex$.subscribe(data => {

      if (data != null) {
        index = data
        console.log("selectIndex: ", index);
      }
    });
    
    this.store.dispatch(new SetSelectorIndex(index + 1));
    let arrayIsCheck$ = this.store.select(getArrayIsCheck).pipe(map(s => s));
    let arrayIsCheck: Array<number>;
    arrayIsCheck$.subscribe(data => {
      if (data != null) {
        arrayIsCheck = data;
        if (arrayIsCheck.every(it => it != 21)) {
          arrayIsCheck.push(21);
            }
        console.log(arrayIsCheck);
      }
    });
  }

  public isValid(name: string): boolean {
    var ctrl = this.userInfo.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }
}