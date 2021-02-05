import { Component, ViewChild, NgZone, OnInit, OnDestroy } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { map, pairwise, filter, throttleTime, tap } from 'rxjs/operators';
import { DataService } from '../service/data.service';
import { ResultItem } from '../service/data';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit, OnDestroy {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  title = 'Angular Infinite Scrolling List';
  sub: Subscription;
  listItems = [];
  lastitem = 0;
  loading = false;
  
  constructor(private service: DataService, private zone: NgZone) { }

  ngOnInit(): void {
    this.fetchMore();
  }

  // We do this inside an ngZone run function because the virtual 
  // scroller runs outside the ngZone for performance reasons.
  ngAfterViewInit(): void {
    this.sub = this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)     
    ).subscribe(() => {
      this.zone.run(() => {
        this.fetchMore();
      });
    });
  }  

  fetchMore(): void {
    if (this.loading === true) {
      return;
    }
    this.loading = true;   
    this.service.getItems(this.lastitem + 1, 60).subscribe(response => {
      console.log('FETCHMORE');
      const result = response as ResultItem;
      this.lastitem = result.LastItem;
      this.listItems = [...this.listItems, ...result.Items];
      this.loading = false;      
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
