import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpCommonService } from 'src/app/@core/http/http-common/http-common-service';
import { DatePipe } from '@angular/common';
import { GereralService } from 'src/app/@core/utils/general.service';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/@core/http/home/home.service';

const data = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
  }
];

@Component({
  selector: 'app-shipment',
  templateUrl: 'shipment.page.html',
  styleUrls: ['shipment.page.scss']
})
export class ShipmentPage {
  constructor(public nav: NavController,
    private route: ActivatedRoute,

    public service: HttpCommonService,
    public homeService: HomeService,

    private datePipe: DatePipe,
    private generalService: GereralService,

  ) { }


  real_path: any; //图片真实地址


  model: any = {
    order_no: '',//订单
    delivery_to_address: '',//地址
    package_qty: '',//件数
    remark: '',//备注
  }

  s_change: any;
  v_change: any;

  s_get: any;
  v_get: any;
  ngOnInit() {

    const v = { v_page_type: 'tab55' };

    this.service.searchThead(v).subscribe(data => {

      console.log(data);

      //change获取的值  提交使用
      this.s_get = JSON.parse(data.input[0].map_input).s;
      this.v_get = JSON.parse(data.input[0].map_input).v;



      //change获取的值  提交使用
      this.s_change = JSON.parse(data.input[1].map_input).s;
      this.v_change = JSON.parse(data.input[1].map_input).v;

    })

    //获取图片信息
    this.service.searchFileInfo('tab55').subscribe(
      data => {
        console.log(data);
        this.real_path = data.json[0].real_path;
      });



  }
  


  ionViewDidEnter() {

    this.route.queryParams.subscribe(queryParams => {
      console.log("2.0 ionViewDidEnter 顾名思义，当将要进入页面时触发");


      console.log(queryParams);
      

      this.model.order_no = queryParams.order_no;//订单
      this.model.delivery_to_address = queryParams.delivery_to_address;//地址
      this.model.package_qty = queryParams.package_qty;//件数
      this.model.remark = queryParams.remark;//备注

      this.homeService.getShipMent(this.model.order_no).subscribe(
        data => {

          console.log(data);

        });

    });
  }


  ionViewWillEnter() {


   
  }


  files = data.slice(0);

  fileChange(params) {

    const { files, type, index } = params;

    //图片添加
    if (params.operationType === 'add') {

      this.uploadImage(params.files[index])

    }

    //图片删除
    if (params.operationType === 'remove') {


    }

    console.log('文件变换');
    console.log(params);
    this.files = files;
  }



  /***********************************************
   * 图片相关操作
   **********************************************/

  unique_name: any//独一无二的名字


  //上传图片

  uploadImage(imageData: any) {

    console.log(imageData.url);

    const dateTime = new Date();

    this.unique_name = this.datePipe.transform(dateTime, 'yyyy-MM-dd') + '-' + this.generalService.uuid() + '.png';

    let v = {
      unique_name: this.unique_name,
      real_path: this.real_path,
      file_base64: imageData.url,
    };

    this.service.insertImageData(v).subscribe(
      data => {

        console.log(data);
        if (data.res == '0') {
        }
      });
  }

  //保存图片到对用单号


  //保存图片信息
  submitImage() {

    //暂存
    this.submit('0');

    const v = { v_page_type: 'tab51' };

    this.service.searchThead(v).subscribe(data => {
      //change获取的值  提交使用
      const s_change = JSON.parse(data.input[1].map_input).s;
      const v_change = JSON.parse(data.input[1].map_input).v;
      v_change.v_unique_name = this.unique_name;
      v_change.v_sale_no = this.model.order;
      v_change.v_real_path = this.real_path;
      v_change.v_file_name = '';


      console.log(v_change);


      this.service.insertData(s_change, v_change).subscribe(
        data => {

          if (data.res == '0') {

          }

        });


    })
  }

  submit(flag: any) {


    this.submitOrder(flag);

    this.service.insertData(this.s_change, this.v_change).subscribe(
      data => {

        console.log(data);


        if (data.res == '0') {


        }


      });
  }

  //提交订单信息
  submitOrder(flag: any) {


    if (this.model.order_no == ' ' || this.model.delivery_to_address == '' || this.model.package_qty == '') {

      window.confirm('*为必填项');
      return;

    }

    this.v_change.v_order_no = this.model.order_no;
    this.v_change.v_delivery_to_address = this.model.delivery_to_address;
    this.v_change.v_package_qty = this.model.package_qty;
    this.v_change.v_status_flag = flag;

    console.log(this.v_change);




  }




  search() {

    console.log('点击了查询');

    this.nav.navigateForward(['/tabs/home/shipment-detail-page'], {
      queryParams: {
        order: this.model.order_no,
      }
    });
  }


}
