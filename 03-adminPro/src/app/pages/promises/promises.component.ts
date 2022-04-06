import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [],
})
export class PromisesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // this.dummiePromises();
    this.getUsers().then((result) => {
      console.log(result);
    });
  }

  dummiePromises(): void {
    const promise = new Promise((resolve, reject) => {
      reject('Something were wrong');
      if (true) {
        resolve('Hello world');
      } else {
      }
    });
    promise
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
    console.log('End dummie promises');
  }

  getUsers(): Promise<any> {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((res) => res.json())
        .then((body) => {
          return resolve(body.data);
        });
    });
  }
}
