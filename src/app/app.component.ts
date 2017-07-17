import {Component, OnInit, Type} from '@angular/core';
import {HelloComponent} from './hello/hello.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';


  ngOnInit(): void {

    let myType = HelloComponent;

    console.log('ctor:', myType['ctorParameters']);
    console.log('decorators: ', myType['decorators']);
  }
}
