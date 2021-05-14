export class AlertModel{
  text:string;
  cls:string;
  time:number;

  constructor(text: string, cls: string, time: number) {
    this.text = text;
    this.cls = cls;
    this.time = time;
  }
}
