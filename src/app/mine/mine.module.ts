import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MinePage } from './mine.page';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgZorroAntdMobileModule,
    RouterModule.forChild([{ path: '', component: MinePage }])
  ],
  declarations: [MinePage]
})
export class MineModule {}
