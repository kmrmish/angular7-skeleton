import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
    title = 'Test Component';

    constructor() { }

    ngOnInit() {

    }
}
