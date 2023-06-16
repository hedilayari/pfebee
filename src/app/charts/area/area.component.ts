import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexYAxis
} from "ng-apexcharts";
import { Subscription, timer } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { IotService } from 'src/app/services/iot.service';
import { Iot } from 'src/app/shared/iot';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  private subscription!: Subscription;

  constructor(private iotservice: IotService) { }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "humidity",
          data: [] // Initialize empty data array
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [] // Initialize empty categories array
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      yaxis: {
        title: {
          text: "Humidity" // Add the title for the y-axis here
        }
      }
    };

    this.subscription = timer(0, 10000).pipe(
      take(10), // Adjust the number of iterations as needed
      switchMap(() => this.iotservice.getAllValues())
    ).subscribe((data: Iot[]) => {
      const labels = data.map(d => d.timestamp);
      const values3 = data.map(d => d.hum);

      // Update chart data
      this.chartOptions.series = [
        { name: "humidity", data: values3 } // Update with appropriate data
      ];
      this.chartOptions.xaxis = {
        type: "datetime",
        categories: labels
      };
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }
}
