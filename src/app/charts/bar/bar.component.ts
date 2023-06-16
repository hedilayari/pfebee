import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexAnnotations,
  ApexFill,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { Subscription, timer } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { IotService } from 'src/app/services/iot.service';
import { Iot } from 'src/app/shared/iot';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: any; // ApexXAxis;
  annotations: ApexAnnotations;
  fill: ApexFill;
  stroke: ApexStroke;
  grid: ApexGrid;
};

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  private subscription!: Subscription;

  constructor(private iotservice: IotService) {}

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "poid",
          data: [],
        }
      ],
      annotations: {
        points: [
          {
            seriesIndex: 0,
            label: {
              borderColor: "#775DD0",
              offsetY: 0,
              style: {
                color: "#fff",
                background: "#775DD0"
              }
            }
          }
        ]
      },
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2
      },
      grid: {
        row: {
          colors: ["#fff", "#f2f2f2"]
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        type: "datetime",
        categories: []
      },
      yaxis: {
        title: {
          text: "poids"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [50, 0, 100]
        }
      }
    };

    this.subscription = timer(0, 10000)
      .pipe(
        take(10), // Adjust the number of iterations as needed
        switchMap(() => this.iotservice.getAllValues())
      )
      .subscribe((data: Iot[]) => {
        const labels = data.map(d => d.timestamp);
        const values3 = data.map(d => d.poid);

        // Update chart data
        this.chartOptions.series = [
          { name: "poid", data: values3 } // Update with appropriate data
        ];
        this.chartOptions.xaxis = {
          labels: {
            rotate: -45
          },
          type: "datetime",
          categories: labels
        };
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the timer when the component is destroyed
    this.subscription.unsubscribe();
  }
}



  

