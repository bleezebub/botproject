import {Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-store-sales',
  templateUrl: './store-sales.component.html',
  styleUrl: './store-sales.component.css'
})
export class StoreSalesComponent {
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
    console.log("createChart was called in store");
    if (this.salesChartRef && this.salesData.length > 0) {
      const ctx = this.salesChartRef.nativeElement.getContext('2d');

      Chart.register(...registerables);

      this.chartInstance = new Chart(ctx, {
        type: 'bar', // Set the chart type to 'bar'
        data: {
          labels: this.salesData.map(entry => entry.STORE_NBR),
          datasets: [{
            label: 'Total Sales',
            data: this.salesData.map(entry => entry.TOTAL_SALES),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'category',
              labels: this.salesData.map(entry => entry.STORE_NBR),
            },
            y: { beginAtZero: true }
          }
        }
      });

    }
  }

  updateChart() {
    console.log("updateChart was called in store");
    this.chartInstance?.reset();
    if (this.chartInstance) {
      // Update chart data
      this.chartInstance.data.labels = this.salesData.map(entry => entry.STORE_NBR);
      this.chartInstance.data.datasets[0].data = this.salesData.map(entry => entry.TOTAL_SALES);

      // Update and re-render the chart
      this.chartInstance.update();
    } else {
      // If chartInstance is not created, create the chart
      this.createChart();
    }
  }

}
