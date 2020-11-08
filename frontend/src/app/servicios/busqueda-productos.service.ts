import { Injectable, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BusquedaProductosService {

  @Output() search: EventEmitter<string> = new EventEmitter();

  searchingNow = false;

  searchTerm = '';

  constructor(
    private router: Router
  ) {}

  searchProducts( term: string ): void {
    this.searchTerm = term;
    if (!this.searchingNow) {
      this.redirect();
      setTimeout(() => {
        this.emitSearchTerm(this.searchTerm);
      }, 100);
    }

    this.emitSearchTerm(term);
    this.toggleSearchState( true );
  }

  toggleSearchState( state: boolean): void {
    this.searchingNow = state;
  }

  redirect(): void {
    this.router.navigate(['productos']);
  }

  emitSearchTerm( term: string ): void {
    this.searchTerm = term;
    this.search.emit(this.searchTerm);
  }
}
