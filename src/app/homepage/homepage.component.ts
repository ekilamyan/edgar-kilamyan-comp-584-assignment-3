import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DatabaseServiceService } from '../shared/services/database.service';
import { Business } from '../shared/models/business';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {
  searchForm = new FormGroup({
    searchTerm: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    open: new FormControl()
  });

  // variables
  public term = '';
  public city = '';
  public state = '';
  public open = '';
  public sortingMethod = 'null';

  public businesses: Business[] = [];

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseServiceService) { }

  ngOnInit(): void {
    this.searchForm.reset();

    this.searchForm = this.formBuilder.group({
      searchTerm: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50)])],
      city: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50)])],
      state: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(50)])],
      open: [''],
    }, { validator: this.atLeastOneRequiredValidator() });

  }

  atLeastOneRequiredValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const searchTerm = group.get('searchTerm').value;
      const city = group.get('city').value;
      const state = group.get('state').value;
      const open = group.get('open').value;
      
      if (!searchTerm && !city && !state && !open) {
        return { atLeastOneRequired: true };
      }
      return null;
    };
  }

  isFormDisabled(): boolean {
    return this.searchForm.invalid;
  }

  submit() {
    this.term = this.searchForm.get("searchTerm").value;
    this.city = this.searchForm.get("city").value;
    this.state = this.searchForm.get("state").value;
 
    if (!this.searchForm.get("searchTerm").value) {
      this.term = "null"; 
    }
    if (!this.searchForm.get("city").value) {
      this.city = "null";
    }
    if (!this.searchForm.get("state").value) {
      this.state = "null";
    }
    if (!this.searchForm.get("open").value) {
      this.open = "null";
    }

    this.databaseService.getQuery(this.term, this.city, this.state, this.open, this.sortingMethod).subscribe((res: any) => {
      this.businesses = res;
    });

    this.searchForm.reset();
  }

  setOpenClose() {
    this.open
  }

  setSorting(method: string) {
    if (method == 'stars') {
      this.sortingMethod = "stars";
    }
    else if (method == 'reviews') {
      this.sortingMethod = "reviews";
    }
    else {
      this.sortingMethod = "null";
    }
  }

}