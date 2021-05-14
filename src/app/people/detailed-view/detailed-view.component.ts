import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/Person.model';
import {Location} from 'src/app/model/Location.model'
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {

  id:number;
  person = new Person();
  timeElapsed:number;
  property:string;
  locations:Location[] = null;
  addedValue:any;

  constructor(private CommService:CommunicationService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let p = new Person();
      let dateOfBirth;
      this.id = params['id'];
      p.ID = this.id;
      console.log(params)
      this.CommService.fetchPerson(p).subscribe(data => {
        console.log(data);
        this.person = data.Data;
        let currentDate = new Date();
        dateOfBirth = new Date(this.person.Birth.Date);
        this.timeElapsed = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate()) ) /(1000 * 60 * 60 * 24 * 365));
      });
    })
  }

  clickOnAddData(value)
  {
    this.property = value;

    if(this.property.startsWith('Place'))
    {
      this.CommService.fetchAllLocations().subscribe(data=>{
        this.locations = data.Data;
        console.log(this.locations);
      })
    }
  }

  addData(){
    let attribute = this.property;
    let value = this.addedValue;
    let p = new Person();
    p = this.person;
    switch (attribute) {
      case 'Place of Birth':
        let loc = new Location()
        loc.ID = value[0]
        loc.Place = value[1]
        p.Birth.Place = loc;
        break;
        case 'Occupation':
          p.Occupation = value;
        break;
    
      default:
        break;
    }
    console.log(p)
    p.ID = this.id;
    Object.keys(p).forEach((k) => p[k] == null && delete p[k]);
    this.CommService.modifyPartial(p).subscribe(data=>{
      if(data.Message.startsWith('Modified'))
      {
        this.property = '';
        this.locations = null;
        window.location.reload()
      }
    })
  }

  deletePerson(){
    console.log(this.id);
    this.CommService.deletePerson(this.id).subscribe(data=>{
      if(data.Message.startsWith('Deleted'))
      {
        this.router.navigateByUrl('/people/view/all')
      }
    })
   
  }
}
