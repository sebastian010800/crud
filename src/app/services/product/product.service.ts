import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private firestore = inject(Firestore);
  private productCollection = collection(this.firestore, ProductModel.REF);

  public async generateKey(): Promise<string> {
    return doc(collection(this.firestore, ProductModel.REF)).id;
  }

  public getAll(): Observable<ProductModel[]> {
    return collectionData(this.productCollection, { idField: 'key' }).pipe(
      map((data) => data as ProductModel[])
    );
  }

  public getByKey(key: string): Observable<ProductModel> {
    const ref = doc(this.firestore, `${ProductModel.REF}/${key}`);
    return docData(ref).pipe(map((d) => d as ProductModel));
  }

  public add(product: ProductModel): Promise<void> {
    const ref = doc(this.firestore, `${ProductModel.REF}/${product.key}`);
    return setDoc(ref, { ...product });
  }

  public update(key: string, data: Partial<ProductModel>): Promise<void> {
    const ref = doc(this.firestore, `${ProductModel.REF}/${key}`);
    return updateDoc(ref, { ...data, updatedAt: Date.now() });
  }

  public delete(key: string): Promise<void> {
    const ref = doc(this.firestore, `${ProductModel.REF}/${key}`);
    return deleteDoc(ref);
  }
}
