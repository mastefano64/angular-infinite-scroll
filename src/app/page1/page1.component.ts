import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataService } from '../service/data.service';
import { Item, ResultItem } from '../service/data';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit, OnDestroy {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  title = 'Angular Infinite Scrolling List';
  listItems = [];
  lastitem = 0;
  loading = false;
  
  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.fetchMore();
  }  

  fetchMore(): void {
    this.loading = true;
    this.service.getAllItems().subscribe(response => {
      this.listItems = response as Item[];
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    // ???
  }
}
