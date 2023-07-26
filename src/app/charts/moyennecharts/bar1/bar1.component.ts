import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";
import { MoyenneService } from "src/app/services/moyenne.service";
import { Moyenne } from "src/app/shared/moyenne";
import { Subscription, timer } from 'rxjs';
import { switchMap, take, share } from 'rxjs/operators';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-bar1',
  templateUrl: './bar1.component.html',
  styleUrls: ['./bar1.component.css']
})
export class Bar1Component implements OnInit, OnDestroy {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  private subscription!: Subscription;

  constructor(private moyService: MoyenneService) {
    this.chartOptions = {
      series: [
        {
          name: "temperature",
          data: []
        },
        {
          name: "humidity",
          data: []
        },
        {
          name: "poid",
          data: []
        }
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: ""
        }
      },
      fill: {
        opacity: 1
      },
    };
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Unsubscribe to avoid memory leaks
  }

  private loadData() {
    this.subscription = timer(0, 10000).pipe(
      take(10), // Adjust the number of iterations as needed
      switchMap(() => this.moyService.getAllValues()),
      share() // Multicast the observable
    ).subscribe((data: Moyenne[]) => {
      const labels = data.map(d => d.mois);
      const values3 = data.map(d => d.temp);
      const values2 = data.map(d => d.hum);
      const values1 = data.map(d => d.poid);

      // Update chart data
      this.chartOptions.series = [
        { name: "temperature", data: values3 },
        { name: "humidity", data: values2 },
        { name: "poid", data: values1 }
      ];
      this.chartOptions.xaxis = {
        categories: labels
      };
    });
  }
}

