import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Location} from '../../model/Location.model';
import {CommunicationService} from '../../services/communication.service';

@Component({
  selector: 'app-add',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  constructor(private CommService: CommunicationService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    let l = new Location();
    l.Place = form.place;
    l.State = form.state;
    l.Country = form.country;
    this.CommService.addLocation(l).subscribe(data => {
      if (data.Message.indexOf('Added') != -1) {
        console.log('Location has been added');
      }
    });
  }
}
