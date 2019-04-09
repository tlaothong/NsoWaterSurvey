import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Content, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EX_TREETON_LIST, EX_TREERAI_LIST, EX_TREEVET_LIST, EX_TREEDOK_LIST, EX_RICH_LIST, EX_RUBBER_LIST } from '../../models/tree';

@IonicPage()
@Component({
  selector: 'page-search-dropdown',
  templateUrl: 'search-dropdown.html',
})
export class SearchDropdownPage {
  public type: string;
  public limit: number;
  public textTitle: string;
  public treeDisplay = '';
  public searchDisplay: Array<any>;
  public searchTerm: string;
  public listData: Array<any>;
  public searchListData: Array<any>;
  @ViewChild(Content) content: Content;
  constructor(public viewCtrl: ViewController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.limit = navParams.get('limit');
    this.treeDisplay = navParams.get('title');
    this.listData = navParams.get('selected');
    this.searchListData = navParams.get('list');
    this.textTitle = navParams.get('textTitle');
    this.searchTerm = "";
    this.searchDisplay = this.searchListData;
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group(
      {
        'code': [null],
        'name': [null]
      },
    );
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  close() {
    this.viewCtrl.dismiss(this.listData);
  }

  select(id, name) {
    if (this.listData.filter(data => data.code == id).length < 1) {
      if (this.listData.length < this.limit)
        this.listData.push({ 'code': id, 'name': name });
      else {
        const alert = this.alertCtrl.create({
          title: 'สามารถเลือกได้สูงสุด ' + this.limit + ' ชนิด',
          buttons: [{
            text: 'ตกลง',
          }]
        });
        alert.present();
      }
      this.scrollToTop();
    } else {
      const alert = this.alertCtrl.create({
        title: 'ไม่สามารถเลือกพืชชนิดซ้ำกันได้',
        buttons: [{
          text: 'ตกลง',
          handler: () => {

          }
        }]
      });
      alert.present();
    }
  }

  setFilteredItems() {
    let ricePlant = EX_RICH_LIST;
    let dryPlant = EX_TREERAI_LIST;
    let rubberPlant = EX_RUBBER_LIST;
    let perenialPlant = EX_TREETON_LIST;
    let herbPlant = EX_TREEVET_LIST;
    let flowerPlant = EX_TREEDOK_LIST;
    let listPlant = [ricePlant, dryPlant, rubberPlant, perenialPlant, herbPlant, flowerPlant];

    this.searchDisplay = this.searchListData.filter((tree) => {
      let temp = '' + tree.code + tree.name;
      let textReturn = temp.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return textReturn;
    });
    console.log("before", this.searchDisplay);

    if (this.searchDisplay.length == 0) {
      this.searchDisplay = [{ name: "พืชที่ search ไม่มีอยู่ในหมวดนี้" }];
      if (ricePlant.some(it => it.name == this.searchTerm.toLowerCase())) {
        this.searchDisplay = [{ name: "พืชที่ search ไม่มีอยู่ในหมวดนี้ (อยู่หมวดข้าว)" }];
      }
      if (dryPlant.some(it => it.name == this.searchTerm.toLowerCase())) {
        this.searchDisplay = [{ name: "พืชที่ search ไม่มีอยู่ในหมวดนี้ (อยู่หมวดพืชไร่)" }];
      }
      if (rubberPlant.some(it => it.name == this.searchTerm.toLowerCase())) {
        this.searchDisplay = [{ name: "พืชที่ search ไม่มีอยู่ในหมวดนี้ (อยู่หมวดยางพารา)" }];
      }
      if (perenialPlant.some(it => it.name == this.searchTerm.toLowerCase())) {
        this.searchDisplay = [{ name: "พืชที่ search ไม่มีอยู่ในหมวดนี้ (อยู่หมวดพืชยืนต้น)" }];
      }
      if (herbPlant.some(it => it.name == this.searchTerm.toLowerCase())) {
        this.searchDisplay = [{ name: "พืชที่ search ไม่มีอยู่ในหมวดนี้ (อยู่หมวดพืชผัก สมุนไพร)" }];
      }
      if (flowerPlant.some(it => it.name == this.searchTerm.toLowerCase())) {
        this.searchDisplay = [{ name: "พืชที่ search ไม่มีอยู่ในหมวดนี้ (อยู่หมวดไม้ดอก ไม้ประดับ การเพาะพันธุ์ไม้)" }];
      }
    }
    console.log("after", this.searchDisplay);

  }

  deselect(index) {
    this.listData.splice(index, 1)
  }

  range(min, max, step) {
    step = step || 1;
    let input = [];
    for (let i = min; i <= max; i += step) {
      input.push(i);
    }
    return input;
  }
}
