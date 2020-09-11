import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [DataService]
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
