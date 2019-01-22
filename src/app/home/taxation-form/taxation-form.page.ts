import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpCommonService } from 'src/app/@core/http/http-common/http-common-service';
import { DatePipe } from '@angular/common';
import { GereralService } from 'src/app/@core/utils/general.service';
import { HomeService } from 'src/app/@core/http/home/home.service';
import { ActionSheet } from 'ng-zorro-antd-mobile';
import { forEach } from '@angular/router/src/utils/collection';

import { Toast } from 'ng-zorro-antd-mobile';
import { ActivatedRoute,Params } from '@angular/router';


const data = [
  {
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'
  },
  {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg'
  }
];

@Component({
  selector: 'app-taxation-form',
  templateUrl: 'taxation-form.page.html',
  styleUrls: ['taxation-form.page.scss'],
  providers: [Toast]

})
export class TaxationFormPage {
  constructor(public nav: NavController,
    public service: HomeService,
    private datePipe: DatePipe,
    private generalService: GereralService,
    private _toast: Toast,
    private route: ActivatedRoute,

  ) { }


  json: any = []; //数据
  data: any = [];


  index1: any;//data第一层索引
  index2: any;//data第二层索引




  model: any = {
    order_no: '',//订单
    employee: '17688788563',//地址
    total: '',//件数
    remark: '',//备注
  }

  ngOnInit() {

    //获取路由参数
    this.route.params.forEach((params: Params) => {
      
      console.log('params');

      console.log(params);
      
    });


    this.route.queryParams.subscribe(queryParams => {

      console.log('queryParams');

      console.log(queryParams);

    });


    this.service.getTaxationForm().subscribe(data => {

      if (data) {

        this.json = data.json;

        this.model.total = data.total;

        this.json.forEach(element => {

          Object.assign({ spe_wage_value: '', checked: false, }, element)

        });
      }


    })

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    console.log('this.route.snapshot.queryParams');


    console.log(this.route.snapshot.queryParams);
  }


  /**
   *查询订单
   *
   * @memberof TaxationFormPage
   */
  search() {

    console.log('点击了查询');

    this.nav.navigateForward(['/tabs/home/taxation-form-detail-page'], {
      queryParams: {
        order: this.model.order_no,
      }
    });
  }

  /***********************************************
 * 子组件list选择
 **********************************************/
  listData: any;//传递给子组件list的数据

  //显示状态
  state = {
    open: false
  };


  /**
   *选中状态
   *
   * @param {*} event 传输数据
   * @param {*} index1 第一层循环索引
   * @param {*} index2 第二层循环索引
   * @memberof TaxationFormPage
   */
  listSelect(event, index1) {

    this.index1 = index1;

    console.log('第一层循环索引' + index1);

    //打开选择list
    this.state.open = true;

    this.listData = event;


  }

  /**
   *从子组件传递过来的值
   *
   * @param {*} event
   * @memberof TaxationFormPage
   */

  //特殊工资
  special_price: any = {};
  openChange(event) {

    this.state.open = false;


    let data_value = '';

    if (event) {

      event.forEach(element => {

        let value = element.wage_name + '(' + element.wage_rule + ');';

        data_value = data_value + value;

      });

      // Object.assign({ key: event }, this.special_price)

      this.special_price['list' + this.index1] = event;

      this.json[this.index1].spe_wage_value = data_value;


      //如果有特殊计价规则
      if (this.special_price['list' + this.index1]) {

        //单价
        let operate_price = this.json[this.index1].operate_price;
        //基础单价
        let standard_operate_price = this.json[this.index1].standard_operate_price;
        //经过特殊计价规则计算过后的价格
        operate_price = this.calculateOperatePrice('list' + this.index1, standard_operate_price) + parseFloat(standard_operate_price);

        //保留4位小数
        operate_price = Math.round(operate_price * 10000) / 10000;
        standard_operate_price = Math.round(standard_operate_price * 10000) / 10000;

        //重新赋值给主数据
        this.json[this.index1].operate_price = operate_price;
        this.json[this.index1].standard_operate_price = standard_operate_price;

        //显示栏位
        this.json[this.index1].operate_price_info = standard_operate_price + '-->' + operate_price;
      }

      //计算总金额
      this.json[this.index1].operate_amount = parseFloat(this.json[this.index1].operate_qty) * this.json[this.index1].operate_price + parseFloat(this.json[this.index1].add_amount ? this.json[this.index1].add_amount : 0);


      this.json[this.index1].operate_amount = Math.round(this.json[this.index1].operate_amount * 10000) / 10000;

    }

  }


  /**
   *
   *
   * @param {*} value input改变的值
   * @param {*} index1 第一层循环索引
   * @memberof TaxationFormPage
   */
  inputChange(value, index1) {



    //如果有特殊计价规则
    if (this.special_price['list' + index1]) {

      //单价
      let operate_price = this.json[index1].operate_price;
      //基础单价
      let standard_operate_price = this.json[index1].standard_operate_price;
      //经过特殊计价规则计算过后的价格
      operate_price = this.calculateOperatePrice('list' + index1, standard_operate_price) + parseFloat(standard_operate_price);

      //保留4位小数
      operate_price = Math.round(operate_price * 10000) / 10000;
      standard_operate_price = Math.round(standard_operate_price * 10000) / 10000;

      //重新赋值给主数据
      this.json[index1].operate_price = operate_price;
      this.json[index1].standard_operate_price = standard_operate_price;

      //显示栏位
      this.json[index1].operate_price_info = standard_operate_price + '-->' + operate_price;
    }


    //计算总金额
    this.json[index1].operate_amount = parseFloat(this.json[index1].operate_qty) * this.json[index1].operate_price + parseFloat(this.json[index1].add_amount ? this.json[index1].add_amount : 0);


    this.json[index1].operate_amount = Math.round(this.json[index1].operate_amount * 10000) / 10000;

    console.log(this.special_price);



  }



  /**
   *第一行的选中状态
   *
   * @param {*} checked
   * @param {*} index
   * @memberof TaxationFormPage
   */
  checkBox(checked, index) {

    checked = !checked;

    this.json[index].checked = checked;
  }

  /**
   *
   * 计算单价
   * @param {*} index
   * @param {*} operate_price
   * @returns
   * @memberof TaxationFormPage
   */
  calculateOperatePrice(index, operate_price) {

    let data = this.special_price[index];


    let special_price = 0;


    for (let i = 0; i < data.length; i++) {


      const element = data[i];

      //如果是协议价格则直接替换
      if (element.wage_rule_id === '0') {

        special_price = parseFloat(element.special_price);
        break;

      }
      //先替换 
      if (element.wage_rule_id === '3') {

        special_price = parseFloat(operate_price);

      }
      //再翻倍 
      else if (element.wage_rule_id === '4') {

        special_price = special_price * 2;
      }
      //加价
      else if (element.wage_rule_id === '1') {

        special_price = parseFloat(element.special_price) + special_price;
      }
      //减价
      else if (element.wage_rule_id === '2') {

        special_price = special_price - parseFloat(element.special_price);
      }

    }

    return special_price;
  }


  /**
   *
   *报单提交
   * @memberof TaxationFormPage
   */
  submit() {

    this.json.forEach(element => {

      if (element.checked) {

        element.operate_qty_2 = element.operate_qty_2 ? element.operate_qty_2 : 0;

        this.service.searchThead('tab61').subscribe(data => {

          if (data) {

            const v = JSON.parse(data.input[1].map_input).v

            this.updateDataConfigChange(v, element);

            console.log(v);

            this.service.submitTaxationForm(v).subscribe(data => {

              console.log(data);

              if (data) {

                Toast.success('提交成功 !!!', 3000, () => {
                  console.log('success');
                });

              }

            })

          }


        })

      }

    });

  }


  updateDataConfigChange(oldData: any, newData: any) {

    for (const key in oldData) {

      if (oldData.hasOwnProperty(key)) {

        const subKey = key.substring(2, key.length);

        oldData[key] = newData[subKey];
      }
    }



    return oldData;

  }




}
