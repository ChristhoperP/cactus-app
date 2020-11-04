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
    if (!this.searchingNow) {
      this.router.navigate(['productos']);
      this.toggleSearchState( true );
    }

    this.searchTerm = term;
    this.search.emit(this.searchTerm);
    console.log('Buscando por: ' + this.searchTerm);
  }

  toggleSearchState( state: boolean): void {
    this.searchingNow = state;
  }
}
