import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis
} from "ng-apexcharts";
import { Subscription, timer } from 'rxjs';
import { switchMap, take, share } from 'rxjs/operators';
import { IotService } from 'src/app/services/iot.service';
import { Iot } from 'src/app/shared/iot';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  private subscription!: Subscription;

  constructor(private iotservice: IotService) { }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "temperature",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 7,
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: []
      },
     
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          gradientToColors: ["#fc5e03"],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      yaxis: {

        title: {
          text: "temperature"
        }
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    };

    this.subscription = timer(0, 10000).pipe(
      take(10), // Adjust the number of iterations as needed
      switchMap(() => this.iotservice.getAllValues()),
      share() // Multicast the observable
    ).subscribe((data: Iot[]) => {
      const labels = data.map(d => d.timestamp);
      const values3 = data.map(d => d.temp);

      // Update chart data
      this.chartOptions.series = [
        { name: "temperature", data: values3 } // Update with appropriate data
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

