import { Component, OnInit } from '@angular/core';
import { HttpWrapperService } from '../shared/services/http.wrapper.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
    title = 'Test Component';

    endPoint = 'users/kmrmish';
    jsonFileName : string = 'SampleJson.json';
    
    userData : any;
    jsonData : any;

    constructor(
      private httpWrapper: HttpWrapperService
    ) { }

    ngOnInit() {
      this.httpWrapper.get(this.endPoint).subscribe((data) => {
          this.userData = data;
      }, (error) => {
          console.log(error);
      });

      this.httpWrapper.getJSON(this.jsonFileName).subscribe((data) => {
        this.jsonData = data;
      }, (error) => {
          console.log(error);
      });
    }
}
