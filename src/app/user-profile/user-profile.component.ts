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
  isSaved :boolean= false;
  percentage:number=0;
  incorrectPassword : boolean= false;
  correctPassword :boolean= false;
  isPasswordError:boolean=false;
  disable : any;

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
    this.resetDisplay();
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
    if(!this.incorrectPassword){
      this.isPasswordError=false;
      this.resetDisplay();
      this.userDetails = this.userForm.getRawValue();
      console.log(JSON.stringify(this.userDetails));
    }else{
      this.isPasswordError=true;
    }
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
    if(this.percentage>60 && (this.userForm.controls['newPassword'].value === this.userForm.controls['confirmPassword'].value)){
      this.incorrectPassword = false;
      this.correctPassword = true;
    }else if(this.percentage>=20){
      this.incorrectPassword = true;
      this.correctPassword = false;
    }
  }

  clearPassword() {
    this.incorrectPassword = false;
    this.userForm.controls['confirmPassword'].setValue('');
  }

  resetDisplay(){
    this.disable= {
      title : true,
      email : true,
      phone : true,
      location: true
    };
  }

}
