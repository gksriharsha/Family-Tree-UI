import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../model/Person.model';
import {Observable} from 'rxjs';
import {Location} from '../model/Location.model';

export interface PeopleResponseData {
  Message:string,
  Data:Person[]
}

export interface LocationResponseData{
  Message:string,
  Data:Location[]
}

export interface AuthQueryData{
  Message:string,
  Result:any
}

interface DataSubmission {
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:5000';

  fetchAllPeople(){
    let p = new Person()
    p.Firstname = 'all'
    return this.http
      .post<PeopleResponseData>(this.baseUrl+'/get/person',p);

  }

  fetchPeopleCount(){
    return this.http
      .get<AuthQueryData>(this.baseUrl+'/query/count_people');
  }

  addPerson(p: Person) {
    p['type']='quick_add'
    return this.http
      .post<DataSubmission>(this.baseUrl+'/add/person',p);
  }

  fetchLocationsCount() {
    return this.http
      .get<AuthQueryData>(this.baseUrl+'/query/count_locations');
  }

  fetchLocations(l:Location){
    return this.http
      .post<LocationResponseData>(this.baseUrl+'/get/location',l);
  }
}
