import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../servicios/administrador/productos.service';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

productos:any =[];

  constructor(private _productoService: ProductosService) {
    
   }

  ngOnInit(): void {
    this._productoService.getProductos()
    .subscribe((res:any)=> {
        this.productos = res;
        console.log(res);
        
      } );
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
