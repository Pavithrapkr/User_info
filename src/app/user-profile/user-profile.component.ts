import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [DataService]
})
export class UserProfileComponent implements OnInit {
  
  mail='sjayakumar@mindlogic.com';
  timezone='(GMT+05.00) Ekaterinburg';
  percentage=0;
  display = {
    title : true,
    email : true,
    phone : true,
    location: true
  }

  constructor() { }

  ngOnInit(): void {
  }

}
