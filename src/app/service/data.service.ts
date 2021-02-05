import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResultItem, Item } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private items = [];

  constructor() { 
    this.createItems();
  }

  getAllItems(): Observable<Item[]> {
    const result = [ ...this.items ];

    const obs = new Observable<Item[]>(sub => {      
      setTimeout(() => {
        sub.next(result);
        sub.complete();
      }, 2000);
    });
    
    return obs;
  }

  getItems(start: number, size: number): Observable<ResultItem> {
    const result = new ResultItem();

    if (start < this.items.length) {
      for (let i = start; i < start + size; i++) {
        result.Items.push(this.items[i]);
        result.LastItem = i;
      }
    }   
    const obs = new Observable<ResultItem>(sub => {      
      setTimeout(() => {
        sub.next(result);
        sub.complete();
      }, 2000);
    });

    return obs;
  }

  private createItems(): void {
    const images = ['IuLgi9PWETU', 'fIq0tET6llw', 'xcBWeU4ybqs', 'YW3F-C5e8SE', 'H90Af2TFqng'];

    const list = [];
    for (let i = 0; i < 2000; i++) {
      const randomPhotoId = Math.round(Math.random() * 4);
      list.push({
        title: 'List Item ' + i,
        content: 'This is some description of the list - item # ' + i,
        image: `https://source.unsplash.com/${images[randomPhotoId]}/50x50`
      });
    }

    this.items = list;  
  }  
}
