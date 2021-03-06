import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { ISubmitRequestable } from '../../shared/ISubmitRequestable';
import { provinceData } from '../../models/ProvinceData';
import { LocationDataProvider } from '../../providers/location-data/location-data';
import { districtData } from '../../models/DistrictData';

@Component({
  selector: 'location',
  templateUrl: 'location.html'
})

export class LocationComponent implements ISubmitRequestable {

  public provinceData: any;
  public province: any;
  public district: any;
  public subDistrict: any
  public provinceCode:any;

  @Input() public FormItem: FormGroup;
  @Input("isAnimal") public isAnimal: boolean;
  private submitRequested: boolean;
  public text: string;

  constructor(public fb: FormBuilder) {
    this.text = 'Hello World';
    this.isAnimal = true;
    // this.getprovince();
    this.FormItem = LocationComponent.CreateFormGroup(this.fb);
  }

  ngOnInit() {
    this.provinceData = provinceData.sort((a, b) => a.name.localeCompare(b.name));

    if (!this.isAnimal && this.FormItem.get('province').value == 999) {
      this.FormItem.reset();
    }
    else if (this.FormItem.get('province').value != 999) {
      this.onChange(this.FormItem.get('province').value);
      if (this.FormItem.get('district').value != 999) {
        this.onChange1(this.FormItem.get('district').value);
      }
    }
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      'province': [999, Validators.required],
      'district': [999, Validators.required],
      'subDistrict': [999, Validators.required]
    });
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.dirty || this.submitRequested)
  }

  submitRequest() {
    this.submitRequested = true;
  }

  onChange(name: any) {
    let code = provinceData.find(it => it.name == name) || null;
    console.log(code);
    
    if (code != null) {
      this.provinceCode = code.codeProvince;
      let order = LocationDataProvider.getDistric(code.codeProvince);
      this.district = order.sort((a, b) => a.name.localeCompare(b.name))
    }
  }

  onChange1(name: any) {
    var code = districtData.find(it => it.name == name && it.codeProvince == this.provinceCode) || null;
    if (code != null) {
      let order = LocationDataProvider.getSubdistric(code.codeDistrict);
      this.subDistrict = order.sort((a, b) => a.name.localeCompare(b.name))
    }
  }

}