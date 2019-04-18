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
  public searchDisplayOtherPlantRice: Array<any>;
  public searchDisplayOtherPlantDry: Array<any>;
  public searchDisplayOtherPlantRub: Array<any>;
  public searchDisplayOtherPlantPeren: Array<any>;
  public searchDisplayOtherPlantHerb: Array<any>;
  public searchDisplayOtherPlantFlower: Array<any>;
  public isSearch: boolean = false;
  public ricePlant: Array<any>;
  public dryPlant: Array<any>;
  public rubberPlant: Array<any>;
  public perenialPlant: Array<any>;
  public herbPlant: Array<any>;
  public flowerPlant: Array<any>;
  public isNotFound: boolean = false;

  @ViewChild(Content) content: Content;
  constructor(public viewCtrl: ViewController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.limit = navParams.get('limit');
    this.treeDisplay = navParams.get('title');
    this.listData = navParams.get('selected');
    this.searchListData = navParams.get('list');
    this.textTitle = navParams.get('textTitle');
    this.searchTerm = "";
    this.searchDisplay = this.searchListData;
    this.ricePlant = EX_RICH_LIST;
    this.dryPlant = EX_TREERAI_LIST;
    this.rubberPlant = EX_RUBBER_LIST;
    this.perenialPlant = EX_TREETON_LIST;
    this.herbPlant = EX_TREEVET_LIST;
    this.flowerPlant = EX_TREEDOK_LIST;
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
    this.isNotFound = false
    this.isSearch = false;
    this.searchDisplayOtherPlantRice = []
    this.searchDisplayOtherPlantDry = []
    this.searchDisplayOtherPlantRub = []
    this.searchDisplayOtherPlantPeren = []
    this.searchDisplayOtherPlantHerb = []
    this.searchDisplayOtherPlantFlower = []
    this.searchDisplay = this.searchListData.filter((tree) => {
      let temp = '' + tree.code + tree.name;
      let textReturn = temp.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return textReturn;
    });
    this.isSearch = true;
  }

  searchOtherPlant() {
    this.isNotFound = true;
    this.searchDisplayOtherPlantRice = this.ricePlant.filter((tree) => {
      let temp = '' + tree.code + tree.name;
      let textReturn = temp.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return textReturn;
    });
    this.searchDisplayOtherPlantDry = this.dryPlant.filter((tree) => {
      let temp = '' + tree.code + tree.name;
      let textReturn = temp.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return textReturn;
    });
    this.searchDisplayOtherPlantRub = this.rubberPlant.filter((tree) => {
      let temp = '' + tree.code + tree.name;
      let textReturn = temp.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return textReturn;
    });
    this.searchDisplayOtherPlantPeren = this.perenialPlant.filter((tree) => {
      let temp = '' + tree.code + tree.name;
      let textReturn = temp.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return textReturn;
    });
    this.searchDisplayOtherPlantHerb = this.herbPlant.filter((tree) => {
      let temp = '' + tree.code + tree.name;
      let textReturn = temp.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return textReturn;
    });
    this.searchDisplayOtherPlantFlower = this.flowerPlant.filter((tree) => {
      let temp = '' + tree.code + tree.name;
      let textReturn = temp.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      return textReturn;
    });

    var isRice = this.searchDisplayOtherPlantRice.length != 0;
    var isDry = this.searchDisplayOtherPlantDry.length != 0;
    var isRub = this.searchDisplayOtherPlantRub.length != 0;
    var isPeren = this.searchDisplayOtherPlantPeren.length != 0;
    var isHerb = this.searchDisplayOtherPlantHerb.length != 0;
    var isFlower = this.searchDisplayOtherPlantFlower.length != 0;

    if (isRice || isDry || isRub || isPeren || isHerb || isFlower) {
      this.isNotFound = true;
    }
    // if (ricePlant.some(it => it.name == this.searchTerm.toLowerCase())) {
    //   this.searchDisplayOtherPlant = [{ name: "พืชที่ search ไม่มีอยู่ในหมวดนี้ (อยู่หมวดข้าว)" }];
    // }
  }

  alertNotFoundPlant() {
    const notFoundPlant = this.alertCtrl.create({
      title: 'ระบุชื่อพืชอื่นๆที่ต้องการเพิ่ม',
      inputs: [
        {
          name: 'userName',
          placeholder: 'Username'
        },
      ],
      buttons: [
        {
          text: "ยืนยัน",
          handler: data => {
            console.log("name other plant", data.userName);
            var firstCodeOtherPlant;
            this.dryPlant = EX_TREERAI_LIST;
            this.perenialPlant = EX_TREETON_LIST;
            this.herbPlant = EX_TREEVET_LIST;
            this.flowerPlant = EX_TREEDOK_LIST;
            if (this.searchListData == this.dryPlant) {
              firstCodeOtherPlant = 3000;
            }
            else if (this.searchListData == this.perenialPlant) {
              firstCodeOtherPlant = 4000;
            }
            else if (this.searchListData == this.herbPlant) {
              firstCodeOtherPlant = 5000;
            }
            else if (this.searchListData == this.flowerPlant) {
              firstCodeOtherPlant = 6000;
            }

            let sortArrayFindMaxCode = this.searchListData.sort(function (a, b) {
              return Number(b.code) - Number(a.code);
            });

            console.log(sortArrayFindMaxCode);
            console.log(firstCodeOtherPlant);

            if (Number(sortArrayFindMaxCode[0].code < firstCodeOtherPlant)) {
              let maxCodePlant = firstCodeOtherPlant;
              this.searchListData.sort(function (a, b) {
                return Number(a.code) - Number(b.code);
              });
              this.searchListData.push({ code: maxCodePlant.toString(), name: data.userName });
            } else {
              let maxCodePlant = Number(sortArrayFindMaxCode[0].code) + 1;
              this.searchListData.sort(function (a, b) {
                return Number(a.code) - Number(b.code);
              });
              this.searchListData.push({ code: maxCodePlant.toString(), name: data.userName });
            }
            console.log("after push", this.searchListData);

            this.viewCtrl.dismiss();
          },
        },
        "ยกเลิก",
      ]
    });
    notFoundPlant.present();
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
