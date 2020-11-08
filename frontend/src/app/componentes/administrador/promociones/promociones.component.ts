import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../../../servicios/administrador/promociones.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Global } from "../../../servicios/global";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
promociones: any = [];
promocionesFilterByName: any = { nombre: '' };

promosSeleccionadas: any = [];

  constructor(
              private _promocionService: PromocionesService, 
              private router: Router,   
              private filter: FilterPipe) { }

  ngOnInit(): void {
    this._promocionService.getPromociones()
    .subscribe( (res: any) => {
        this.promociones = res;
        console.log(res);
      } );
  }

  setPromoId( id: number ): void {
    const sel = this.getSelectedPromos();
    this.promosSeleccionadas = sel;
  }

  getSelectedPromos(): any[] {
    const checks: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"');
    // const ths: NodeListOf<HTMLTableHeaderCellElement> = document.querySelectorAll('.promo-id');
    const promos = [];

    for (let i = 0; i < checks.length; i++) {
       if (checks[i].checked){
         promos.push( this.promociones[i] );
         // promos.push(parseInt(ths[i].innerText, 10));
       }
    }
    return promos;
  }

  promoActualizada( promocion ): void{
    console.log(promocion);
    this.promosSeleccionadas[0].fechafin = promocion.fechafin;
    this.promosSeleccionadas[0].porcentajedescuento = promocion.porcentajedescuento;
    this.promosSeleccionadas[0].preciocondescuento = promocion.preciocondescuento;
  }

  deletePromociones(): void {

    let showAlert = false;

    Swal.fire({
      title: 'Desea eliminar las promociones seleccionadas?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: `#50a1a5`,
      cancelButtonColor: `red`
    }).then((result) => {

      if (result.isConfirmed) {

        let nPromos: Array<any>;

        for (const promo of this.promosSeleccionadas) {
          this._promocionService.eliminarPromocion( promo.promocion_idpromocion)
            .subscribe( res => {
              console.log( res );
              nPromos = this.promociones.filter( (promocion: any) => promocion.promocion_idpromocion !== promo.promocion_idpromocion );
              this.promociones = nPromos;
              showAlert = true;
            }, err => {
              console.log( err );
              showAlert = false;
            });
        }

        Swal.fire({
          title: 'Promociones eliminadas!',
          icon: 'success',
          confirmButtonColor: `#50a1a5`
        });
      }
    });
  }

  deletePromocion( idpromocion ): void {

    Swal.fire({
      title: 'Desea eliminar esta promoción?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: `#50a1a5`,
      cancelButtonColor: `red`
    }).then((result) => {

      if (result.isConfirmed) {

        let nPromos: Array<any>;

        this._promocionService.eliminarPromocion(idpromocion)
          .subscribe(res => {
            console.log(res);

            nPromos = this.promociones.filter( (promocion: any) => promocion.promocion_idpromocion !== idpromocion );
            this.promociones = nPromos;

            Swal.fire({
              title: 'Promoción eliminada!',
              icon: 'success',
              confirmButtonColor: `#50a1a5`
            });
          }, err => {
            console.log(err);
          });
      }
    });
  }

  emptyPromoAlert(): void{
    Swal.fire({
      title: 'Atención!',
      text: 'Debe seleccionar una promoción',
      icon: 'warning',
      confirmButtonColor: `#50a1a5`
    });
  }

  emptyPromosAlert(): void{
    Swal.fire({
      title: 'Atención!',
      text: 'Debe seleccionar una o más promociones',
      icon: 'warning',
      confirmButtonColor: `#50a1a5`
    });
  }

  manyPromosAlert(): void{
    Swal.fire({
      title: 'Atención!',
      text: 'Solo puede modificar una promoción a la vez',
      icon: 'warning',
      confirmButtonColor: `#50a1a5`
    });
  }

}
