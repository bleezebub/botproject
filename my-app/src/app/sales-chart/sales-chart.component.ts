import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
@Component({
  selector: 'app-sales-chart',
  template: '<canvas #salesChart></canvas>',
  styleUrls: ['./sales-chart.component.css']
})
export class SalesChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('salesChart') salesChartRef!: ElementRef;
  @Input() salesData: any[] = [];
  private chartInstance: Chart | undefined;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes", changes)
    if (changes['salesData']) {
      this.updateChart();
    }
  }

  createChart() {
    console.log("createChart was called");
    if (this.salesChartRef && this.salesData.length > 0) {
      const ctx = this.salesChartRef.nativeElement.getContext('2d');

      Chart.register(...registerables);

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.salesData.map(entry => entry.DATE),
          datasets: [{
            label: 'Total Sales',
            data: this.salesData.map(entry => entry.TOTAL_SALES),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          scales: {
            x: { type: 'time', time: { unit: 'day' } },
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  updateChart() {
    console.log("updateChart was called");
    if (this.chartInstance) {
      // Update chart data
      this.chartInstance.data.labels = this.salesData.map(entry => entry.DATE);
      this.chartInstance.data.datasets[0].data = this.salesData.map(entry => entry.TOTAL_SALES);

      // Update and re-render the chart
      this.chartInstance.update();
    } else {
      // If chartInstance is not created, create the chart
      this.createChart();
    }
  }
}
