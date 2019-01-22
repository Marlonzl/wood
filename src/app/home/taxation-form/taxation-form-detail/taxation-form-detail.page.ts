import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HomeService } from 'src/app/@core/http/home/home.service';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-taxation-form-detail',
  templateUrl: 'taxation-form-detail.page.html',
  styleUrls: ['taxation-form-detail.page.scss']
})
export class TaxationFormDetailPage {


  data: any;


  constructor(
    private route: ActivatedRoute,
    public service: HomeService,
    public nav: NavController,
    private datePipe: DatePipe,


  ) { }



  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {

      console.log(queryParams);
    });

  }

  /***********************************************
 * 筛选条件
 **********************************************/
  //显示状态
  state = {
    open: false
  };

  height: number = document.documentElement.clientHeight;

  //监听展开状态
  onOpenChange(event) {

    this.state.open = !this.state.open;
  }

  /***********************************************
 * 日期选择框
 **********************************************/
  date_vlaue = new Date();
  date_name = '选择日期';
  currentDateFormat(date, format: string = 'yyyy-mm-dd'): any {
    const pad = (n: number): string => (n < 10 ? `0${n}` : n.toString());
    return format
      .replace('yyyy', date.getFullYear())
      .replace('mm', pad(date.getMonth() + 1))
      .replace('dd', pad(date.getDate()))
  }

  onOk2(result) {

    console.log(result);

    this.date_name = this.datePipe.transform(result, 'yyyy-MM-dd');


    console.log(this.date_name);



    this.date_vlaue = result;
  }



  /***********************************************
 * 单选框
 **********************************************/
  selectedStatus1 = { value: 0, name: '出货单' };
  data1 = [{ value: 0, name: '出货单' }, { value: 1, name: '批量生产单' }];
  onChange = event => {

    console.log('ngmodel value: ', JSON.stringify(this.selectedStatus1));
    console.log('output radio status: ', JSON.stringify(event));
  }


  search() {

    this.state.open = !this.state.open;


    //批量生产单
    if (this.selectedStatus1.value) {

      const v = { v_wo_no: '' };

      this.service.getBatchProductionOrder(v).subscribe(data => {

        console.log(data);

        this.data = data.json


      })

    }
    //出货单
    else {

      const v = { v_sale_no: '' };

      this.service.getDeliveryOrder(v).subscribe(data => {

        console.log(data);

        this.data = data.json


      })


    }


  }

  selected(event) {


    let order_no;

    if (this.selectedStatus1.value) {

      order_no = event.wo_no;

    } else {

      order_no = event.sale_no;

    }

    this.nav.navigateForward(['/tabs/home/taxation-form-page'], {
      queryParams: {
        order_no: order_no,
      }
    });

  }


}
