import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  linkTheme = document.getElementById('theme');

  constructor() {}

  ngOnInit(): void {}

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    // set propertie
    this.linkTheme?.setAttribute('href', url);
    // Save theme on localstorage
    localStorage.setItem('theme', url);
  }
}
