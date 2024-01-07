import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashboard';
  years: number[] = [2013, 2014, 2015, 2016, 2017];
  selectedYear: number | undefined;
  salesData: any = [];
  citysalesData: any = [];
  displayByLastYear: boolean = false;
  displayCitySales: boolean = false;
  displayStoreSales: boolean = false;
  statesalesData: any = [];
  formsalesdata: any = [];
  dislayCityYear:boolean = false;
  cities: any = [];
  salesForm: FormGroup;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.salesForm = this.formBuilder.group({
      city: [''], // Initial value can be an empty string or any default city
      year: ['']
    });
    const apiUrl = `http://127.0.0.1:5000/api/list/city`;
    this.http.get(apiUrl).subscribe((data) => {
      this.cities = data;
    });
  }

  onYearChange() {
    this.displayByLastYear = true;
    this.displayCitySales = false;
    this.displayStoreSales = false;
    const apiUrl = `http://127.0.0.1:5000/api/sales/year/${this.selectedYear}`;
    this.http.get(apiUrl).subscribe((data) => {
      this.salesData = data;
    });
  }
  predictionTotalSales() {
    this.displayByLastYear = true;
    this.displayCitySales = false;
    this.displayStoreSales = false;
    const apiUrl = `http://127.0.0.1:5000/api/sales/prediction`;
    this.http.get(apiUrl).subscribe((data) => {
      this.salesData = data;
    });
  }

  cityTotalSales() {
    this.displayStoreSales = false;
    this.displayByLastYear = false;
    this.displayCitySales = true;
    const apiUrl = `http://127.0.0.1:5000/api/sales/city/all`;
    this.http.get(apiUrl).subscribe((data) => {
      this.citysalesData = data;
    });

  }

  storeTotalSales(){
    this.displayByLastYear = false;
    this.displayCitySales = false;
    this.displayStoreSales = true;
    const apiUrl = `http://127.0.0.1:5000/api/sales/store/all`;
    this.http.get(apiUrl).subscribe((data) => {
      this.statesalesData = data;
    });

  }
  storeSalesPrediction() {
    this.displayByLastYear = false;
    this.displayCitySales = false;
    this.displayStoreSales = true;
    const apiUrl = `http://127.0.0.1:5000/api/sales/store/prediction`;
    this.http.get(apiUrl).subscribe((data) => {
      this.statesalesData = data;
    });

  }

  onFormSubmit() {
    this.displayByLastYear = false;
    this.displayCitySales = false;
    this.displayStoreSales = false;
    this.dislayCityYear = true;
    const selectedCity = this.salesForm.get('city')?.value;
    const selectedYear = this.salesForm.get('year')?.value;
    if (selectedCity && selectedYear) {
      const apiUrl = `http://127.0.0.1:5000/api/sales/city/${selectedCity}/year/${selectedYear}`;
      this.http.get(apiUrl).subscribe((data) => {
        this.formsalesdata = data;
      });
    }

  }


}
