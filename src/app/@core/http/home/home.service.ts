import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../../base-service/base.service';

@Injectable()

export class HomeService extends BaseService {



  //获取表头公用方法
  searchThead(tab: any): Observable<any> {

    const v = { v_page_type: tab };

    const s = { s_mapid: 'get_s_columns_info_t' };


    return this.httpClientService.post(this.get, this.formatData(s, v));
  }


  /**
   *  获取报单信息
   * @param  params [description]
   * @return        [description]
   */
  getTaxationForm(): Observable<any> {

    const s = { s_mapid: 'get_r_operate_submit_apply_web' };

    const v = { v_form_no: 'bjw-20190121', v_operator_no: "1882387" };

    return this.httpClientService.post(this.get, this.formatData(s, v));
  }



  /**
   *
   * 报单提交
   * @param {*} v 提交参数
   * @returns {Observable<any>}
   * @memberof HomeService
   */
  submitTaxationForm(v: any): Observable<any> {

    const s = { s_mapid: 'change_r_operate_submit' };

    return this.httpClientService.post(this.insert, this.formatData(s, v));

  }


  /**
   *已提交的出货单查询
   *
   * @param {*} v
   * @returns {Observable<any>}
   * @memberof HomeService
   */
  getDeliveryOrder(v: any): Observable<any> {

    const s = { s_mapid: 'get_r_ship' };

    Object.assign({ v_status_flag: '1' }, v)

    // {v_sale_no:''}

    return this.httpClientService.post(this.get, this.formatData(s, v));

  }


  /**
   *已提交的批量生产单查询
   *
   * @param {*} v
   * @returns {Observable<any>}
   * @memberof HomeService
   */
  getBatchProductionOrder(v: any): Observable<any> {

    const s = { s_mapid: 'get_r_wo' };

    Object.assign({ v_status_flag: '1' }, v)

    // {v_wo_no:''}

    return this.httpClientService.post(this.get, this.formatData(s, v));

  }










  /**
   *  发货单信息获取
   * @param  params [description]
   * @return        [description]
   */
  getShipMent(order_no: any): Observable<any> {

    const s = { s_mapid: 'get_r_delivery' };

    const v = { v_order_no: order_no };

    return this.httpClientService.post(this.get, this.formatData(s, v));
  }

}
