import { Component, OnInit } from '@angular/core';
// This function is global it was declared on assets/js/custom.js
declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    customInitFunctions();
  }
}
