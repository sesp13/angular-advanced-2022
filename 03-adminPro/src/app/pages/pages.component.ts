import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// This function is global it was declared on assets/js/custom.js
declare function customInitFunctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    customInitFunctions();
  }
}
