import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  title: string = '';
  titleSubs?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    // Another way to read params 
    console.log(route.snapshot.children[0].data);

    this.titleSubs = this.getDataArgs().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${this.title}`;
    });
  }

  getDataArgs(): Observable<any> {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: any) => event.snapshot.firstChild === null),
      map((event: any) => event.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    this.titleSubs?.unsubscribe();
  }
}
