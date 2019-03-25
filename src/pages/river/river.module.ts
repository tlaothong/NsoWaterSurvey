import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RiverPage } from './river';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    RiverPage,
  ],
  imports: [
    IonicPageModule.forChild(RiverPage),
    ComponentsModule,
    DirectivesModule,
  ],
})
export class RiverPageModule {}
