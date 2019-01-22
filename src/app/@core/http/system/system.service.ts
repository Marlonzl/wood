import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../../base-service/base.service';

@Injectable()

export class SystemService extends BaseService {




  /**
   *  获取菜单
   * @param  params [description]
   * @return        [description]
   */
  getMenuData(): Observable<any> {

    const url = this.environment.domain + 'PubCrl/getPubService';

    const s = { s_mapid: 'get_menu_user_permit' };

    const v = { v_user_psw: '' };

    return this.httpClientService.post(url, this.formatData(s, v));
  }

}
