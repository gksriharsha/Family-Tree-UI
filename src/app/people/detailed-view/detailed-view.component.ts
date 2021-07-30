import { Component, OnInit,ViewChild,ElementRef, AfterViewInit } from '@angular/core';
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
  profile_picture:string;
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

  detection_Image:any;
  task_id:string;
  face_locations:any;
  selected_facelist:any;
  selected_id_list:any;
  @ViewChild('dataContainer') inp: HTMLInputElement;
  constructor(private CommService:CommunicationService,private router:Router,private route:ActivatedRoute,private alert: AlertService) { }

  ngOnInit(): void {
    this.lastNameSearch = 'Not Searching';
    this.today = new Date();
    this.yearController = new FormControl('', [Validators.max(this.today.getFullYear()), Validators.min(1900)]);
    this.relations = {};
    this.detection_Image = null;
    this.task_id = null;
    this.face_locations = [];
    this.selected_facelist = [];
    this.selected_id_list = [];
    
    let dateOfBirth;
    if('person' in history.state){
      this.person = history.state['person'];
      this.relations = history.state['relations'];
      this.id = this.person.ID;
      console.log(this.person.Birth);
    }
    else{
      this.route.params.subscribe(params => {
        let p = new Person();
        this.id = params['id'];
        p.ID = this.id;
        
        this.CommService.fetchPerson(p).subscribe(data => {
          this.person = data.Data;
          this.relations = data.Relations;
          console.log(data.Data.Birth);
        });
      })
    }
    let currentDate = new Date();
    dateOfBirth = new Date(this.person.Birth.Date);
    this.timeElapsed = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate()) ) /(1000 * 60 * 60 * 24 * 365));
    console.log(this.timeElapsed);
    console.log(this.person.Birth);
    console.log(currentDate);
    if(this.person.Death != null){
      if(this.person.Death.Date !=null){
        let dateOfDeath = new Date(this.person.Death.Date);
        this.timeElapsed = Math.floor((Date.UTC(dateOfDeath.getFullYear(), dateOfDeath.getMonth(), dateOfDeath.getDate()) - Date.UTC(dateOfBirth.getFullYear(), dateOfBirth.getMonth(), dateOfBirth.getDate()) ) /(1000 * 60 * 60 * 24 * 365));
      }
    }
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
  buttonPress(){
    document.getElementById("uploadImage").click();
  }
  
  uploadImage(files:FileList){
    console.log(files.item(0).size);
    this.CommService.pictureRelate(files.item(0),null,null,null).subscribe(data =>{
      console.log(data);
      this.detection_Image = data['Image'];
      this.detection_Image = this.detection_Image.split('\'')[1];
      this.face_locations = data['Face-locations'];
      this.task_id = data['Task-id'];
      console.log(this.detection_Image);
      let img_tag = document.getElementById('recognition2');
      img_tag.setAttribute('src','data:image/jpg;base64,'+this.detection_Image);
    });
  }

  selectFace(name,id){
    if(this.selected_facelist.indexOf(name) == -1){
      this.selected_facelist.push(name);
      this.selected_id_list.push(id);
    }
    else{
      this.selected_facelist.splice(this.selected_facelist.indexOf(name),1);
      this.selected_id_list.splice(this.selected_id_list.indexOf(id),1);
    }
    console.log(this.selected_facelist);
  }

  uploadSelection(){
    this.face_locations = [];
    if(this.selected_id_list.indexOf(this.id) != -1){
      this.selected_id_list.splice(this.selected_id_list.indexOf(this.id),1);
    }
    this.CommService.pictureRelate(null,this.id,this.selected_id_list,this.task_id).subscribe(data=>{
      this.task_id = '';
      this.face_locations = null;
      this.detection_Image = data['Image'];
      this.detection_Image = this.detection_Image.split('\'')[1];
      let img_tag = document.getElementById('recognition2');
      img_tag.setAttribute('src','data:image/jpg;base64,'+this.detection_Image);
    });
  }
  clearData()
  {
    this.selectedPerson = null;
    this.path = null;
    this.inp.value = '';
    this.results = null;
    this.selected_facelist = [];
    this.selected_id_list = [];
    this.detection_Image = null;
  }
}
