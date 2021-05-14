import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CommunicationService} from '../services/communication.service';
import {Person} from '../model/Person.model';

export class returnData{
  count:number;
  people:Person[];
}

@Injectable({providedIn: 'root'})
export class PeopleResolver implements Resolve<any>
{
  constructor(private CommService:CommunicationService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('Resolving');
    return this.CommService.fetchAllPeople();
  }
}


