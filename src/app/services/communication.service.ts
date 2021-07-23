import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from '../model/Person.model';
import {Observable} from 'rxjs';
import {Location} from '../model/Location.model';
import { Relation } from '../model/Relation.model';

export interface PeopleResponseData {
  Message: string;
  Data: Person[];
}

export interface PersonResponseData{
  Message:string;
  Data:Person;
  Relations:any;
}

export interface LocationResponseData {
  Message: string;
  Data: Location[];
}

export interface QueryData {
  Message: string;
  Result: any;
}

export interface DataSubmission {
  Message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'http://localhost:5000';

  fetchAllPeople(p:Person): Observable<PeopleResponseData> {
    return this.http
      .post<PeopleResponseData>(this.baseUrl + '/get/person', p);

  }

  fetchPerson(p:Person): Observable<PersonResponseData>{
    return this.http
      .post<PersonResponseData>(this.baseUrl + '/get/person', p);
  }

  fetchAllLocations(): Observable<LocationResponseData>{
    let l: Location;
    l = new Location();
    l.Place = 'all';
    return this.http.post<LocationResponseData>(this.baseUrl + '/get/location',l);
  }
  fetchPeopleCount(): Observable<QueryData> {
    return this.http
      .get<QueryData>(this.baseUrl + '/query/count_people');
  }

  addPerson(p: Person): Observable<DataSubmission> {
    p['type'] = 'quick_add';
    return this.http
      .post<DataSubmission>(this.baseUrl + '/add/person', p);
  }

  addRelative(r: Relation) {
    return this.http
      .post<DataSubmission>(this.baseUrl + '/relate/people', r);
  }

  addLocation(l: Location): Observable<DataSubmission> {
    return this.http.post<DataSubmission>(this.baseUrl + '/add/location', l);
  }

  fetchLocationsCount() {
    return this.http
      .get<QueryData>(this.baseUrl + '/query/count_locations');
  }

  fetchLocations(l: Location) {
    return this.http
      .post<LocationResponseData>(this.baseUrl + '/get/location', l);
  }

  fetchAllLastNames() {
    return this.http
      .get<QueryData>(this.baseUrl + '/query/fetch_lastNames');
  }

  fetchRelation(relation){
    return this.http
      .post(this.baseUrl+'/search/relation',relation);
  }

  deletePerson(node:number){
    return this.http
      .delete<DataSubmission>(this.baseUrl + '/delete/nodes/'+node);
  }

  modifyPartial(person:Person){
    return this.http
      .post<DataSubmission>(this.baseUrl+'/modify/person',person)
  }
}
