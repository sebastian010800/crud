import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent {
  @Input() product: ProductModel | null;
  @Output() saveProduct = new EventEmitter<ProductModel>();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  public productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.initForm();
    this.product = null;
  }

  ngOnInit() {
    this.productForm= this.initForm();
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      name: [this.product?.name || '', [Validators.required]],
      value: [this.product?.value || 0, [Validators.required]],
      stock: [this.product?.stock || 0, [Validators.required]],
    });
  }

  public onSubmit() {
    if (this.productForm.valid) {
      if (this.productForm.valid) {
        const formData = this.productForm.value;
        const newProduct = new ProductModel(
          this.product?.key || '',
          this.product?.createdAt || Date.now(),
          Date.now(),
          formData.name,
          formData.value,
          formData.stock
        );
        this.saveProduct.emit(newProduct);
      } else {
        console.error('Form is invalid');
      }
    }
  }

  public onCancel() {
    this.cancel.emit();
  }
}
