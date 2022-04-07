import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscriber, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  intervalSubscription?: Subscription;

  constructor() {
    // this.returnObservable()
    //   .pipe(retry(1))
    //   .subscribe(
    //     (value) => console.log(`value ${value}`),
    //     (error) => console.warn(`Error: ${error}`),
    //     () => console.info('Everything done!')
    //   );

    this.intervalSubscription = this.returnInterval().subscribe(
      (value: string) => console.log(value)
    );
  }

  returnInterval(): Observable<string> {
    return interval(500).pipe(
      map((value) => value + 1), // 0 => 1
      // Only show pair numbers!
      filter((value) => value % 2 == 0),
      // Transform observable exit
      map((value: number) => `Hello world ${value}`)
      // First 20 pair numbers or hello worlds
      // take(10)
    );
  }

  returnObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer: Subscriber<any>) => {
      const interval = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          console.log('i == 2 error');
          observer.error('i has reached the value of 2');
        }
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    // Kill observable
    this.intervalSubscription?.unsubscribe();
  }
}
