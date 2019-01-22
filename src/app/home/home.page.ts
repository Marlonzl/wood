import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SystemService } from '../@core/http/system/system.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(
    private router: Router,
    public systemService: SystemService,
    public nav: NavController
  ) { }

  // navigate() {
  //   this.router.navigate(['/tabs/home/detail'])
  // }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


  }

  // ionViewDidLoad() {


  // }

  // ionViewDidEnter() {
  //   this.systemService.getMenuData().subscribe(
  //     data => {
  //       let menus = data.SystemModule;
  //       menus.forEach(element => {

  //         this.grid.push({ icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: element.title })
  //         console.log(this.grid);


  //       });
  //     });
  // }


  ionViewWillEnter() {
    console.log("2.0 ionViewWillEnter 顾名思义，当将要进入页面时触发");
  }
  ionViewDidEnter() {

    this.systemService.getMenuData().subscribe(
      data => {

        let menus = data.SystemModule;
        menus.forEach(element => {

          this.grid.push({ icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: element.title })
          console.log(this.grid);

        });
      });
    console.log("3.0 ionViewDidEnter 当进入页面时触发");
  }
  ionViewWillLeave() {
    console.log("4.0 ionViewWillLeave 当将要从页面离开时触发");
  }
  ionViewDidLeave() {
    console.log("5.0 ionViewDidLeave 离开页面时触发");
  }
  ionViewWillUnload() {
    console.log("6.0 ionViewWillUnload 当页面将要销毁同时页面上元素移除时触发");
  }

  ionViewCanEnter() {
    console.log("ionViewCanEnter");
  }

  ionViewCanLeave() {
    console.log("ionViewCanLeave");
  }



  // data = Array.from(new Array(9)).map((_val, i) => ({
  //   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  //   text: `菜单${i}`
  // }));

  grid: any = [
    { icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: '发货' },
    { icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png', text: '报单' }
  ];

  click(event) {
    console.log(this.grid);
    console.log(event);


    if (event.index === 0) {
      this.nav.navigateForward("/tabs/home/shipment-page")

    }
    if (event.index === 1) {
      
      this.nav.navigateForward("/tabs/home/taxation-form-page")

    }


  }
}
