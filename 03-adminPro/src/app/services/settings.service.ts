import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.getElementById('theme');
  themeLinks?: NodeListOf<HTMLElement>;

  constructor() {
    this.setTheme();
  }

  setTheme(): void {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.linkTheme?.setAttribute('href', theme);
    }
  }

  changeTheme(theme: string): void {
    const url = `./assets/css/colors/${theme}.css`;
    // set propertie
    this.linkTheme?.setAttribute('href', url);
    // Save theme on localstorage
    localStorage.setItem('theme', url);
    // Update view
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void {
    // Theme links must be defined on the component
    this.themeLinks?.forEach((link: HTMLElement) => {
      // Delete working class
      link.classList.remove('working');
      // If this is the current theme add working class
      const btnTheme = link.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentThemeUrl = this.linkTheme?.getAttribute('href');
      // Add class
      if (btnThemeUrl == currentThemeUrl) {
        link.classList.add('working');
      }
    });
  }
}
