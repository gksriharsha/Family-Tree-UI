import {Component} from '@angular/core';
import {Person} from '../../model/Person.model';
import {CommunicationService} from '../../services/communication.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector:'add-people',
  templateUrl:'./add-person.component.html',
  styleUrls:['./add-person.component.css']
})
export class AddPersonComponent{
  yearController = new FormControl("",[Validators.max(2030), Validators.min(1900)]) ;

  constructor(private CommService:CommunicationService) {
  }

  onSubmit(form:any) {
    let p = new Person();
    p.Firstname = form.name;
    p.DOB = form.DOB;
    p.Gender = form.gender;
    console.log(p);
    this.CommService.addPerson(p).subscribe(data =>{
      if(data.message.indexOf("added") != -1)
      {
        console.log("Added");
      }
    });
    p = null;
  }
}
