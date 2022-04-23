import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styles: [],
})
export class SearchsComponent implements OnInit {
  
  users: User[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: SearchsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => this.globalSearch(term));
  }

  globalSearch(term: string): void {
    if (!term || term == '') {
      this.router.navigate(['/dashboard']);
    } else {
      this.searchService.globalSearch(term).subscribe((res: any) => {
        this.doctors = res.doctors;
        this.hospitals = res.hospitals;
        this.users = res.users;
      });
    }
  }
}
