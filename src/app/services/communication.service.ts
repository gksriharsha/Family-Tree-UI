import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../model/Person.model';
import {Observable} from 'rxjs';

export interface AuthResponseData {
  Message:string,
  Data:Person[]
}

export interface AuthQueryData{
  Message:string,
  Result:any
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http:HttpClient) { }

  fetchAllPeople(){
    return this.http
      .post<AuthResponseData>('http://localhost:5000/get/person',{'name':'all'});

  }

  fetchPeopleCount(){
    return this.http
      .get<AuthQueryData>('http://localhost:5000/query/count_people');
  }

}
