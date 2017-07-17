import {Component, OnInit, Input, ElementRef} from '@angular/core';

@Component({
  selector:  'app-hello',
  template:  'Hello {{toWhom}}, from {{from}}',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {


  @Input()
  toWhom: string = 'Pepa';

  @Input()
  from: string = 'Jozo';

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }

}
