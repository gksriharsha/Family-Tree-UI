import {Component, OnInit} from '@angular/core';
import {AlertService} from '../services/alert.service';
import {AlertModel} from '../model/Alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alertText: AlertModel;

  constructor(private alert: AlertService) {
    alert.notifier.subscribe(str => {
        this.alertText = str;
      }
    );
  }

  ngOnInit(): void {
  }

}
