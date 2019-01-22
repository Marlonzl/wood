import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';

import { Observable } from 'rxjs/Observable';


/**
 * httpclient服务
 */
@Injectable()
export class HttpClientService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  /**
   * request
   *
   * @return any
   */
  request(method: string, url: string, options?: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    observe?: HttpObserve;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  }): Observable<any> {
    return this.commonProcess(this.httpClient.request(method, url, options = {}));
  }



  /**
 * delete
 * @param url
 * @param options
 */
  delete(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.delete(url, options = {}));
  }

  /**
 * get
 * @param url
 * @param options
 */
  get(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.get(url, options = {}));
  }

  /**
   * head
   * @param url
   * @param options
   */
  head(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.head(url, options = {}));
  }

  /**
  * options
  * @param url
  * @param options
  */
  options(url: string, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.options(url, options = {}));
  }

  /**
  * patch
  * @param url
  * @param options
  */
  patch(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.patch(url, body, options = {}));
  }


  /**
  * post
  * @param url
  * @param options
  */
  post(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.post(url, body, options = {}));
  }

  /**
  * put
  * @param url
  * @param options
  */
  put(url: string, body: any | null, options: {
    headers?: HttpHeaders | { [header: string]: string | string[] },
    observe?: HttpObserve,
    params?: HttpParams | { [param: string]: string | string[] },
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    return this.commonProcess(this.httpClient.put(url, body, options = {}));
  }

  /**
   * 公共处理
   * @param observable
   */
  commonProcess(observable: Observable<any>): Observable<any> {


    return Observable.create((observer) => {
      observable.subscribe(res => {


        if(res.res == '1'){
          
          console.log('我是最后的错误请求');

          console.log(res.result);
          
        }

        observer.next(res);
      }, (err) => {


        console.log('我是最后的错误');

        console.log(err);
        
        observer.error(err);
      }, () => {
        observer.complete();
      });
    });
  }

}
