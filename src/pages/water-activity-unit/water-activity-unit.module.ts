import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaterActivityUnitPage } from './water-activity-unit';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    WaterActivityUnitPage,
  ],
  imports: [
    IonicPageModule.forChild(WaterActivityUnitPage),
    ComponentsModule,
    DirectivesModule,
  ],
})
export class WaterActivityUnitPageModule {}
