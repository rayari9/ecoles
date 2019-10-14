import { Component, OnInit ,ViewChild  } from '@angular/core';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'app-testt',
  templateUrl: './testt.component.html',
  styleUrls: ['./testt.component.css']
})
export class TesttComponent implements OnInit {

  private count = 1;
  phoneNumberIds: number[] = [1];

  @ViewChild('myForm')
  private myForm: FormGroup;


  constructor() {}

  ngOnInit() {
  }
  remove(i: number) {
    this.phoneNumberIds.splice(i, 1);
  }

  add() {
    this.phoneNumberIds.push(++this.count);
  }


  printMyForm() {
    console.log(this.myForm);
  }

  register(myForm: NgForm) {
    console.log('Registration successful.');
    console.log(myForm.value);
  }

}
