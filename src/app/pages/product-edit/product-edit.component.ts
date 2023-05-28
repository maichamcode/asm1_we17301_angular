import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  product:IProduct = {
    name:"",
    price:0
  }
  constructor (private productService:ProductService, private router: ActivatedRoute){
    this.router.paramMap.subscribe(param=>{
      const id = Number(param.get('id'));
      this.productService.getProductById(id).subscribe(product=>{
        this.product = product
      },error=>console.log(error)
      )
    })
  }
  onHandleSubmit(){
    this.productService.editProduct(this.product).subscribe(product=>{
      window.location.href = "/admin/product"
    })
  }
}
