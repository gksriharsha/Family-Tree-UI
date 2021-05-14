import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../services/communication.service';
import {Location} from '../../model/Location.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  Locations: Location[];
  count: number;

  constructor(private CommService: CommunicationService, private router: Router) {
  }

  ngOnInit(): void {
    this.CommService.fetchAllLocations().subscribe(data => {
      this.Locations = data.Data;
      console.log(this.Locations);
    });
  }

  viewLocation(ID: any): void {
    this.router.navigateByUrl('/location/view/' + ID);
  }
}
