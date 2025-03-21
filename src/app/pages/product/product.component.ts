import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ProductModel } from '../../models/product.model';
import { take, from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from '../../form/form-product/form-product.component';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  public products: ProductModel[];
  public showForm: boolean;
  public selectProduct: ProductModel | null;
  public product!: ProductModel;

  constructor(private productService: ProductService) {
    this.products = [];
    this.selectProduct = null;
    this.showForm = false;
  }

  ngOnInit() {
    this.getProducts();
  }
  public getProducts() {
    this.productService
      .getAll()
      .pipe(take(1))
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public onCancel() {
    this.showForm = false;
    this.selectProduct = null;
  }


  public onAddProduct() {
    this.showForm = true;
    this.selectProduct = null;
  }

  public onEditProduct(product: ProductModel) {
    this.showForm = true;
    this.selectProduct = product;
  }

  public async onCreatedProduct(newProduct: ProductModel) {
    console.log(newProduct);
    const key = await this.productService.generateKey();
    const productToAdd = { ...newProduct, key };
    this.productService.add(productToAdd).then(() => {
      this.showForm = false;
      this.getProducts();
    }
    );
  }

  public  onSaveProduct(updateProduct: ProductModel): void {
    if (!updateProduct?.key) {
      this.onCreatedProduct(updateProduct);}
    else {
      this.productService.update(updateProduct.key, updateProduct).then(() => {
        this.showForm = false;
        this.getProducts();
      }
      );
    }
  }

  public onDeleteProduct(product: ProductModel) {
    from(this.productService.delete(product.key)).subscribe({
      next: () => {
        this.getProducts();
      },
    });
  }
}
