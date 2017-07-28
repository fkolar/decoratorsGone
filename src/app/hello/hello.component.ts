import {Component, OnInit, Input, ElementRef} from '@angular/core';

@Component({
  selector:  'app-hello',
  template:  'Hello {{toWhom}}, from {{from}}',
  styleUrls: ['./hello.component.css'],
  inputs: ['toWhom', 'from'],
})
export class HelloComponent implements OnInit {


  toWhom: string = 'Pepa';
  from: string = 'Jozo';

  @Input()
  aa: String = 'aaaaa';

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    console.log(HelloComponent['decorators'])
  }
}
