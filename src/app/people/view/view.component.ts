import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../services/communication.service';
import {Person} from '../../model/Person.model';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  People:Person[];

  constructor(private comm:CommunicationService) { }

  ngOnInit(): void {
    this.comm.fetchAllPeople().subscribe(response => {
      this.People = response.Data;
      console.log(this.People);
    });
  }

}
