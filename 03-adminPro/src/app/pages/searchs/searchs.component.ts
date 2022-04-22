import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styles: [],
})
export class SearchsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      if (!term || term.length == '') {
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
