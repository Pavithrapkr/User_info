import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms'
import {DataService} from '../data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [DataService]
})
export class UserProfileComponent implements OnInit {
  userForm :FormGroup;
  userDetails:Object;
  isSaved = false;
  percentage=0;
  incorrectPassword = false;

  disable  = {
    title : true,
    email : true,
    phone : true,
    location: true
  }

  savedValue = {
    title : '',
    email : '',
    phone : '',
    location: ''
  }

  constructor() { 
    this.userForm = new FormGroup({
      title: new FormControl({value:'', disabled:true}),
      email: new FormControl({value:'sjayakumar@mindlogic.com', disabled:true}),
      phone: new FormControl({value:'', disabled:true}),
      location: new FormControl({value:'', disabled:true}),
      timezone: new FormControl({value:'(GMT+05.00) Ekaterinburg', disabled:true}),
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  editInput(value : any) {
    this.isSaved = false;
    this.disable[value] = false;
    this.userForm.controls[value].enable();
  }

  saveChanges(value : any) {
    this.isSaved = true;
    this.disable[value] = true;
    this.userForm.controls[value].disable();
    this.savedValue[value] = this.userForm.controls[value].value ;
  }

  cancelChanges(value : any) {
    this.isSaved = false;
    this.disable[value] = true;
    this.userForm.controls[value].disable();
    this.userForm.controls[value].setValue(this.savedValue[value]);
  }

  saveForm() {
    this.userDetails = this.userForm.getRawValue();
    console.log(JSON.stringify(this.userDetails));
  }

  copyContent (value:any) {
    return this.userForm.controls[value].value;
  }

  validatePassword() {
    this.percentage =0;
    let testValue = this.userForm.controls['newPassword'].value;
    this.percentage = (new RegExp(/\d/)).test(testValue) ? this.percentage+20: this.percentage;
    this.percentage = (new RegExp(/[A-Z]/)).test(testValue) ? this.percentage+20: this.percentage;
    this.percentage = (new RegExp(/[a-z]/)).test(testValue) ? this.percentage+20: this.percentage;
    this.percentage = (new RegExp(/[_\-\$&@]/)).test(testValue) ? this.percentage+20: this.percentage;
    this.percentage = (new RegExp(/.{8,20}/)).test(testValue) ? this.percentage+20: this.percentage;
  }

  confirmPassword() {
    this.incorrectPassword = (this.userForm.controls['newPassword'].value === 
        this.userForm.controls['confirmPassword'].value) ? false : true;
  }

  clearPassword() {
    this.incorrectPassword = false;
    this.userForm.controls['confirmPassword'].setValue('');
  }

}
