import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/model/Person.model';
import {Location} from 'src/app/model/Location.model'
import { CommunicationService } from 'src/app/services/communication.service';
import { AlertModel } from 'src/app/model/Alert.model';
import { AlertService } from 'src/app/services/alert.service';
import { FormControl, Validators } from '@angular/forms';
import { Relation } from 'src/app/model/Relation.model';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['../../app.component.css', './detailed-view.component.css']
})
export class DetailedViewComponent implements OnInit {


  id:number;
  person = new Person();
  timeElapsed:number;
  property:string;
  locations:Location[] = null;
  addedValue:any;
  relations:any;
  spouseSelect;

  lastNameSearch: string;
  lastNames:string[];
  yearController: FormControl;
  today: Date;
  Lastname:string;
  Lastname2:string;
  relationToBeAdded: string;
  gender:string;

  results:Person[];

  constructor(private CommService:CommunicationService,private router:Router,private route:ActivatedRoute,private alert: AlertService) { }

  ngOnInit(): void {
    this.lastNameSearch = 'Not Searching';
    this.today = new Date();
    this.yearController = new FormControl('', [Validators.max(this.today.getFullYear()), Validators.min(1900)]);
    this.relations = {};

    this.route.params.subscribe(params => {
      let p = new Person();
      let dateOfBirth;
      this.id = params['id'];
      p.ID = this.id;
      console.log(params)
      this.CommService.fetchPerson(p).subscribe(data => {
        console.log(data);
        this.person = data.Data;
        this.relations = data.Relations;
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
    else{
      this.locations = null;
    }
  }

  clickOnAddPerson(value)
  {
    this.relationToBeAdded = value;
    if(this.relationToBeAdded != 'Mother')
    {
      this.Lastname = this.person.Lastname;
    }
    else{
      this.Lastname = '';
    }
    if(this.relationToBeAdded == 'Father')
    {
      this.gender = 'Male';
    }
    if(this.relationToBeAdded == 'Mother')
    {
      this.gender = 'Female';
    }
    if(this.relationToBeAdded == 'Sibling' || this.relationToBeAdded == 'Child')
    {
      this.gender = '';
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

  onSubmit(form: any) {
    let p = new Person();
    p.Firstname = form.value.fname;
    p.Lastname = form.value.lname;
    p.Birth.Date = form.value.DOB;
    p.Gender = form.value.gender;
    p.Related = this.relationToBeAdded;
    if(form.value.alive)
    {
      p.Alive = 'Alive';
    }
    else{
      p.Alive = 'Dead';
    }
    let R = new Relation();
    if(this.relationToBeAdded == 'Spouse')
    {
      this.person.ID = this.id;
      Object.keys(this.person).forEach((k) => this.person[k] == null && delete this.person[k]);
      R.A = this.person;
      Object.keys(p).forEach((k) => p[k] == null && delete p[k]);
      R.B = p;
      R.Relation = 'Marriage';
      R.Method = 'Add-Relate';
    }
    else if(this.relationToBeAdded == 'Parents')
    {
      console.log(form.value);
      this.person.ID = this.id;
      Object.keys(this.person).forEach((k) => this.person[k] == null && delete this.person[k]);
      R.A = this.person;
      p.Gender = 'Male'
      Object.keys(p).forEach((k) => p[k] == null && delete p[k]);
      R.B = p;
      let q = new Person();
      q.Firstname = form.value.fname2;
      q.Lastname = this.Lastname2;
      q.Birth.Date = form.value.DOB2;
      q.Gender = 'Female';
      q.Related = 'Mother';
      if(form.value.alive2)
      {
        q.Alive = 'Alive';
      }
      else{
        q.Alive = 'Dead';
      }
      Object.keys(q).forEach((k) => q[k] == null && delete q[k]);
      R.C = q;
      R.Relation = 'Parents';
      R.Method = 'Add-Relate';
    }
    else if(this.relationToBeAdded == 'Child')
    {
      this.person.ID = this.id;
      Object.keys(this.person).forEach((k) => this.person[k] == null && delete this.person[k]);
      Object.keys(p).forEach((k) => p[k] == null && delete p[k]);
      R.A = p;
      if(this.relations['Spouse'].length == 1)
      {
        R.B = this.relations['Spouse'][0];
      }
      else{
        R.B =  this.spouseSelect;
      }
      R.C = this.person;
      R.Relation = 'Child';
      R.Method = 'Add-Relate';
    }
    else if(this.relationToBeAdded == 'Sibling')
    {
      this.person.ID = this.id;
      Object.keys(this.person).forEach((k) => this.person[k] == null && delete this.person[k]);
      Object.keys(p).forEach((k) => p[k] == null && delete p[k]);
      R.A = p;
      R.B = this.relations['Father'];
      R.C = this.relations['Mother'];
      R.Relation = 'Child';
      R.Method = 'Add-Relate';
    }
    console.log(R);
    this.CommService.addRelative(R).subscribe(data => {
      let a;
      if (data.Message.indexOf('added') !== -1) {
        console.log('Added');
        a = new AlertModel('Person Successfully added', 'success', 3);
        this.alert.setAlertText(a);
      }
    });
    p = null;
    form.reset();
  }

  searchLastnames() {
    console.log(this.Lastname);
    this.CommService.fetchAllLastNames().subscribe(data => {
      this.lastNames = data.Result;
      console.log(this.lastNames);
      console.log(this.lastNames.indexOf(this.Lastname));
      if(this.lastNames.indexOf(this.Lastname) == 0)
      {
        this.lastNameSearch = 'Found';
      }
      else{
        this.lastNameSearch = 'Not Found';
      }
    });
}
  search(event)
  {
    let p = new Person;
    this.path = null;
    p['Search Text'] = event.target.value;
    this.CommService.fetchAllPeople(p).subscribe(data=>{
      this.results = data.Data;
    })
  }
  path:string;
  selectedPerson:string;
  searchResult(firstname,value:number)
  {
    let rel = {};
    rel['start_id'] = value;
    rel['end_id'] = this.id;
    this.CommService.fetchRelation(rel).subscribe(data =>{
      this.path = data['Relation'];
      this.selectedPerson = firstname;
      console.log(data);
    })
  }
  clearData()
  {
    this.selectedPerson = '';
    this.path = '';
  }

}
