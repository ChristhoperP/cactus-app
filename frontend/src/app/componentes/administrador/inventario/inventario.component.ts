import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  deleteProduct(): void {
    Swal.fire({
      title: 'Desea eliminar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: `#50a1a5`,
      cancelButtonColor: `red`
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Producto eliminado!',
          icon: 'success',
          confirmButtonColor: `#50a1a5`
        });
      }
    });
  }

  deleteProducts(): void {
    Swal.fire({
      title: 'Desea eliminar los productos seleccionados?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: `#50a1a5`,
      cancelButtonColor: `red`
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Productos eliminados!',
          icon: 'success',
          confirmButtonColor: `#50a1a5`
        });
      }
    });
  }

}
