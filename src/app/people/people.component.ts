import {RouterModule} from '@angular/router';
import {CommunicationService} from '../services/communication.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector:'app-people',
  templateUrl:'./people.component.html',
  styleUrls:['./people.component.css'],
  providers:[]
})
export class PeopleComponent implements OnInit{

  constructor(private CommService:CommunicationService) {
  }

  ngOnInit(): void {
  }

}
