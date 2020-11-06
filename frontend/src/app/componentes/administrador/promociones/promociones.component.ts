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

  emptyPromoAlert(): void{
    Swal.fire({
      title: 'Atención!',
      text: 'Debe seleccionar una promoción',
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
