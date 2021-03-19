import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../services/communication.service';
import {Location} from '../../model/Location.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  Locations:Location[];
  count:number;
  constructor(private CommService:CommunicationService) { }

  ngOnInit(): void {
    this.CommService.fetchLocationsCount().subscribe( data => {
      this.count = data.Result;
    });
  }

}
