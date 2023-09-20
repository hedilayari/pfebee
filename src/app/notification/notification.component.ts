import { Component, OnInit, OnDestroy } from '@angular/core';
import { Iot } from '../shared/iot';
import { IotService } from '../services/iot.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  public isDropdownOpen = false;
  public notifDetected: Iot[] = [];
  public dates: string[] = [];
  private timer: any;

  constructor(private iotService: IotService) {}

  ngOnInit() {
    this.loadData();
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  public toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  private loadData() {
    this.iotService.getAllValues().subscribe((data: Iot[]) => {
      this.notifDetected = data.filter(d => {
        // Filtrer les données en fonction des seuils
        const poidsMax = 50;
        const poidsMin = 16;
        const humiditeMax = 20;
        const humiditeMin = 15;
        const temperatureMax = 40;
        const temperatureMin = 30;
        const analogSeuil = 500; // Seuil pour l'analogique
  
        const poidsAlerte = d.poid > poidsMax || d.poid < poidsMin;
        const humiditeAlerte = d.hum >= humiditeMax || d.hum <= humiditeMin;
        const temperatureAlerte = d.temp >= temperatureMax || d.temp <= temperatureMin;
        const analogAlerte = d.analog > analogSeuil;
  
        return poidsAlerte || humiditeAlerte || temperatureAlerte || analogAlerte;
      }).slice(0, 999999);
  
      this.updateDates(data);
    });
  }
  

  private updateDates(data: Iot[]) {
    this.dates = data.map(d => this.formatDate(d.timestamp));
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.loadData();
    }, 1000); // Change the interval to a more appropriate value (e.g., 1000 ms = 1 second)
  }

  private stopTimer() {
    clearInterval(this.timer);
  }

  private formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  markNotificationAsRead(i: number) {
    const copyOfNotifications = [...this.notifDetected];
    copyOfNotifications.splice(i, 1);
    this.notifDetected = copyOfNotifications;
  }
  
  
}

