import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../../base-service/base.service';




@Injectable()

export class HttpCommonService extends BaseService {



  //获取表头公用方法
  searchThead(v: any, s: any = {}): Observable<any> {


    s = { s_mapid: 'get_s_columns_info_t' };


    return this.httpClientService.post(this.get, this.formatData(s, v));
  }


  searchTheadNoUse() {


  }


  //



  //插入图片公用方法

  insertImageData(image: any): Observable<any> {

    const s = { s_mapid: 'uploadfile' };

    const v = {
      v_unique_name: image.unique_name,
      v_real_path: image.real_path,
      v_file_base64: image.file_base64
    };

    console.log(v);

    return this.httpClientService.post(this.insert, this.formatData(s, v));
  }


  //有图片上传的页面首先获取文件信息
  searchFileInfo(pageType: any): Observable<any> {

    const s = { s_mapid: 'get_s_file_category' };
    const v = {
      v_page_type: pageType,
      v_server_ip: "",
      v_upload_type: ""
    };

    return this.httpClientService.post(this.get, this.formatData(s, v));
  }



  //获取menu权限列表  包括标题等
  getMenuPermit(module_id: any): Observable<any> {

    const s = { s_mapid: 'get_f_role_permit_t' };
    const v = {
      v_module_id: module_id,

    };

    return this.httpClientService.post(this.get, this.formatData(s, v));

  }

  

  //基本资料
  searchData(s: any, v: any): Observable<any> {

    return this.httpClientService.post(this.get, this.formatData(s, v));

  }


  updateData(s: any, v: any): Observable<any> {

    return this.httpClientService.post(this.update, this.formatData(s, v));

  }

  insertData(s: any, v: any): Observable<any> {




    return this.httpClientService.post(this.insert, this.formatData(s, v));

  }

  deleteData(s: any, v: any): Observable<any> {

    return this.httpClientService.post(this.delete, this.formatData(s, v));

  }


}
