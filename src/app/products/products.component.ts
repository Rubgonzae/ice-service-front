import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../core/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.fetchProducts()
  }

  fetchProducts(){
    this.http.get<any>(`${environment.API_URL}Productos`)
    .subscribe(data=>{
      this.products=data;
    })
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

}
