import {Component, OnInit} from '@angular/core';
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

    debugger;
    console.log('decorators: ', Object.keys(myType));
  }
}
