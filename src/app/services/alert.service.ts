import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AlertModel} from '../model/Alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  notifier: BehaviorSubject<AlertModel> = new BehaviorSubject<AlertModel>(new AlertModel(' ', '', 0));

  setAlertText(Alert: AlertModel): void {
    this.notifier.next(Alert);
    console.log('Service ', Alert.text);
    setTimeout(() => {
      this.clearAlertText_();
    }, Alert.time * 1000);
  }

  clearAlertText_(): void {
    this.notifier.next(new AlertModel(' ', '', 0));
  }
}
