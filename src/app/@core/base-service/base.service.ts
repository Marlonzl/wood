import { Injectable } from '@angular/core';

import { HttpClientService } from './http/http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GereralService } from '../utils/general.service';


/**
 * 业务基础service
 */
@Injectable()
export class BaseService {


  baseData: any;

  get: string = this.environment.domain + 'PubCrl/getPubService';
  update: string = this.environment.domain + 'PubCrl/updatePubService';
  insert: string = this.environment.domain + 'PubCrl/insertPubService';
  delete: string = this.environment.domain + 'PubCrl/deletePubService';

  constructor(
    public httpClientService: HttpClientService,
    public http: HttpClient,
    private gereralService: GereralService,

  ) {


  }

  get environment(): any {
    return environment;
  }

  formatDataLogin(s: any, v: any = {}): FormData {

    const params = {
      s: {
        s_mapid: '',//方法名
        s_user_no: "1882387",//工号
        s_system_id: "2",//系统id
        s_type_id: '',//类型id
        s_start_index: '',//开始页数
        s_rows: ''//总页数
      },
      v: {}
    };

    params.s.s_mapid = s.s_mapid;
    params.s.s_user_no = s.s_user_no;
    params.v = v;

    // console.log(params);

    const input = new FormData();

    input.append('v_json', this.gereralService.base64encoder(JSON.stringify(params)));

    return input;

  }


  formatData(s: any, v: any = {}): FormData {
    const params = {
      s: {
        s_mapid: '',//方法名
        s_user_no: '17688788563',//工号
        s_system_id: "3",//系统id
        s_type_id: '',//类型id
        s_start_index: '',//开始页数
        s_rows: ''//总页数
      },
      v: {}
    };

    params.s.s_mapid = s.s_mapid;
    params.v = v;

    // console.log(JSON.stringify(params));

    const input = new FormData();

    input.append('v_json', this.gereralService.base64encoder(JSON.stringify(params)));

    return input;
  }
}
