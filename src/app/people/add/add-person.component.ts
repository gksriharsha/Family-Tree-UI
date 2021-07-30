import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {Person} from '../../model/Person.model';
import {CommunicationService} from '../../services/communication.service';
import {FormControl, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {AlertModel} from '../../model/Alert.model';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  yearController: FormControl;
  today: Date;
  lastName: string;
  date: string;
  lastNames: string[];
  lastNameSearch: string;
  searching:Boolean = false;

  constructor(private CommService: CommunicationService, private alert: AlertService) {
  }

  ngOnInit(): void {
    this.lastNameSearch = 'Not Searching';
    this.today = new Date();
    this.lastName = '';
    this.lastNames = [];
    this.yearController = new FormControl('', [Validators.max(this.today.getFullYear()), Validators.min(1900)]);
    this.date = this.today.getFullYear() + '-' + String(this.today.getMonth() + 1).padStart(2, '0')
      + '-' + String(this.today.getDate()).padStart(2, '0');
  }

  searchLastnames() {
      console.log(this.lastName);
      this.CommService.fetchAllLastNames().subscribe(data => {
        this.lastNames = data.Result;
        if(this.lastNames.indexOf(this.lastName) == 0)
        {
          this.lastNameSearch = 'Found';
        }
        else{
          this.lastNameSearch = 'Not Found';
        }
      });
}


  onSubmit(form: any) {
    let p = new Person();
    p.Firstname = form.value.fname;
    p.Birth.Date = form.value.DOB;
    p.Gender = form.value.gender;
    p.Lastname = form.value.lname;
    form.reset();
    this.CommService.addPerson(p).subscribe(data => {
      let a;
      if (data.Message.indexOf('added') !== -1) {
        a = new AlertModel('Person Successfully added', 'success', 3);
        this.alert.setAlertText(a);
      }
    });
    p = null;
  }
}
