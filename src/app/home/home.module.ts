import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

import { HomeRoutingModule, routedComponents } from './home-routing.module';
import { GereralService } from '../@core/utils/general.service';
import { SystemService } from '../@core/http/system/system.service';
import { HttpCommonService } from '../@core/http/http-common/http-common-service';

import { DatePipe } from '@angular/common';
import { HomeService } from '../@core/http/home/home.service';

import { CheckListComponent } from './taxation-form/check-list/check-list.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgZorroAntdMobileModule,
    HomeRoutingModule
  ],
  declarations: [

    ...routedComponents,
    CheckListComponent
  ],
  providers: [
    GereralService,
    SystemService,
    HttpCommonService,
    HomeService,
    DatePipe
  ],
})
export class HomePageModule { }
