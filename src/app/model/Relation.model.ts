import { Person } from "./Person.model";

export class Relation{
    Relation:string;
    A:Person;
    B:Person;
    C?:Person;
    Method:string;
    constructor()
    {}
}