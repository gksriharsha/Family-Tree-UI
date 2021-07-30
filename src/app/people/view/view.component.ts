import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../services/communication.service';
import {Person} from '../../model/Person.model';
import {ActivatedRoute, Router} from '@angular/router';
import {newArray} from '@angular/compiler/src/util';
import { AlertService } from 'src/app/services/alert.service';
import {AlertModel} from '../../model/Alert.model';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['../../app.component.css', './view.component.css']
})
export class ViewComponent implements OnInit {

  People: Person[];
  nullPeople: boolean;
  image_string:any;
  coordinates:any;
  path:string;
  results:Person[];
  task_id:string;
  recognition_Image:string;
  recognition_selection:number;
  recognizedlist;
  recognizednumbers;
  recognizedIds;

  constructor(private comm: CommunicationService, private router: Router, private route: ActivatedRoute,private alert: AlertService) {
  }

  ngOnInit(): void {
    this.People = [];
    this.recognizedlist = [];
    this.recognizednumbers = [];
    this.recognizedIds = [];
    this.route.data.subscribe(data => {
      if (data.data.Data != null) {
        this.People = data.data.Data;
      }
    });
    console.log(this.People.length);
  }

  viewPerson(id: number) {
    this.router.navigateByUrl('/people/view/' + id);
  }

  search(event)
  {
    let p = new Person;
    this.path = null;
    p['Search Text'] = event.target.value;
    this.comm.fetchAllPeople(p).subscribe(data=>{
      this.results = data.Data;
    })
  }

  imageUploadWindow(){
    document.getElementById("fileUpload").click();
  }

  recognize(){
    document.getElementById("recognize-upload").click()
  }

  uploadForRecognition(files:FileList){
    this.comm.pictureRecognize(files.item(0),null,null).subscribe(data=>{
      this.recognition_Image = data['Image'];
      this.recognition_Image = this.recognition_Image.split('\'')[1]
      this.coordinates = data['Face-locations'];
      this.task_id = data['Task-id'];
      document.getElementById('recognize-picture').setAttribute('src','data:image/jpg;base64,'+this.recognition_Image);
    });
  }

  imageUpload(files:FileList){
    console.log(files.item(0).size);
    this.comm.pictureSearch(files.item(0),null,null).subscribe(data =>{
      this.image_string = data['Image']
      this.image_string = this.image_string.split('\'')[1]
      this.coordinates = data['Face-locations']
      this.task_id = data['Task-id']
      console.log(this.coordinates);
      document.getElementById('openModalButton').click();
      document.getElementById('reduced-image').setAttribute('src','data:image/jpg;base64,'+this.image_string);
    });
  }

  navigateFace(coords:any){
    document.getElementById("closeModal").click();
    
    let css_coords = JSON.parse("["+""+coords.coords+"]");
    let python_coords = []
    console.log(css_coords);
    python_coords.push(css_coords[1]);
    python_coords.push(css_coords[2]);
    python_coords.push(css_coords[3]);
    python_coords.push(css_coords[0]);
    console.log(python_coords);
    this.comm.pictureSearch(null,python_coords,this.task_id).subscribe(data =>{
      console.log('Redirect part');
      this.router.navigateByUrl('/people/view/'+data.Data.ID,{state:{'person':data.Data,'relations':data.Relations}});
    });
    console.log(coords.coords);
  }

  selectFace(num:number){
    this.recognition_selection = num;
  }

  updateList(name,id){
    if(this.recognizednumbers.indexOf(this.recognition_selection) != -1)
    {
      let temp = this.recognizednumbers.indexOf(this.recognition_selection);
      this.recognizedlist.splice(temp,1);
      this.recognizedIds.splice(temp,1);
      this.recognizednumbers.splice(temp,1);
    }
    this.recognizedlist.push(name);
    this.recognizednumbers.push(this.recognition_selection);
    this.recognizedIds.push(id);
  }

  submitRecognitions(){
    let v_map = [];
    for(let [k,v] of this.recognizednumbers.entries()){
      for(let [i,j] of this.coordinates.entries()){
        if(j[1] == v)
        {
          v_map = v_map.concat([j[0],this.recognizedIds[k]]);
          break;
        }
      }
    }
    this.comm.pictureRecognize(null,v_map,this.task_id).subscribe(data =>{
      document.getElementById('closeModal2').click();
      let a = new AlertModel('Face data is mapped', 'success', 3);
      this.alert.setAlertText(a);
    });
  }

  clearData(){
    this.image_string = '';
    this.recognition_Image = null;
    this.coordinates = null;
    this.recognizedIds = [];
    this.recognizedlist = [];
    this.recognizednumbers = [];
    document.getElementById('recognize-picture').setAttribute('src','');
  }
}
