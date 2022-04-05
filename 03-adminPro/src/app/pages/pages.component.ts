import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  linkTheme = document.getElementById('theme');
  constructor() {}

  ngOnInit(): void {
    this.setTheme();
  }

  setTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.linkTheme?.setAttribute('href', theme);
    }
  }
}
