import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../../services/communication.service';
import {Person} from '../../model/Person.model';
import {ActivatedRoute, Router} from '@angular/router';
import {newArray} from '@angular/compiler/src/util';



@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  People:Person[];
  nullPeople:boolean;

  constructor(private comm:CommunicationService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.People = [];
    this.route.data.subscribe(data => {
      if(data.data.Data != null)
      {
        this.People = data.data.Data;
      }
    })
    console.log(this.People.length)
  }

  viewPerson(id:number) {
    this.router.navigateByUrl('/people/view/'+id);
  }
}
