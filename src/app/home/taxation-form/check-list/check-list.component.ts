import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],


})
export class CheckListComponent {


  @Input() data: any;//接收父组件的值

  @Input() open: boolean = false;//接收父组件的值

  @Output('openChange') openChangeBack = new EventEmitter<any>();


  title: any;

  constructor(
    private datePipe: DatePipe,

  ) {

  }

  ngOnInit() {


  }



  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data'] !== undefined) {

      let data = changes['data'].currentValue;

      if (data) {
        //转换字符串为字符
        data.forEach((element, index) => {

          this.data[index].checked = element.checked === '0' ? 0 : 1;

        });
      }
      this.data = data;
    }

    if (changes['open'] !== undefined) {

      this.open = changes['open'].currentValue;
    }
  }

  onChange = (val: any) => {
    console.log('onChange Event: ', val);
    console.log('changed data: ', this.data);
  }

  ok() {

    this.open = false;

    let special_price = [];
    //遍历选中的数据
    this.data.forEach(element => {

      //如果是选中状态
      if (element.checked) {

        special_price.push(element);

      }

    });

    this.openChangeBack.emit(special_price);

  }

  cancel() {
    this.open = false;

    this.openChangeBack.emit();

  }



}
