import {Component, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommunicationService} from '../services/communication.service';

@Component({
  selector:'app-home',
  templateUrl:'./home.component.html',
  styleUrls:['./home.component.css'],
  providers:[]
})
export class HomeComponent implements OnInit{

  peopleCount = 0;

  constructor(private CommService:CommunicationService) {
  }

  ngOnInit(): void {
    this.CommService.fetchPeopleCount().subscribe(data => {this.peopleCount = data.Result})
  }

}
