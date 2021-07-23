import {Location} from './Location.model';
interface TimePlaceEvent{
  Date:string,
  Place:Location,
  RegionalDate?:string,
}
export class Person{
  public ID:number;
  public Firstname:string;
  public Gender:string;
  public Lastname:string;
  public Occupation:string;
  public PlaceOfOccupation:string;
  public Native:Location;
  public Alive:string;

  public Birth:TimePlaceEvent;
  public Death?:TimePlaceEvent;
  public Marriage:TimePlaceEvent[]; 
  public Related?:string;
  
  
  constructor(){
    let place = new Location();
    this.Birth = {
      Date : '',
      Place : place,
    }
  }

}
