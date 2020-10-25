import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../servicios/administrador/productos.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Global } from "../../../servicios/global";


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
categorias:any = [];
productos:any =[];
productosFilterByName: any = { nombre: '' };
productosFilterByCategoria: any = { categoria: '' };
public url: string;

productosInventario: any = [];
categoriaSeleccionada;
filtrados=[];

  constructor(private _productoService: ProductosService, private filter: FilterPipe) {
    this.url = Global.url;    
   }

  ngOnInit(): void {
    this._productoService.getProductos()
    .subscribe((res:any)=> {
        this.productos = res;
        console.log(res);
        this.productosInventario = this.productos;
        console.log(this.productosInventario);

        
      } );

      this._productoService.getCategorias()
      .subscribe((res:any)=> {
          this.categorias = res;
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

  filtrarProductoCategoria(cat){
    console.log(cat);
    this.categoriaSeleccionada = cat;
    this.filtrados=[];
    if (cat=="mostrarTodo") {
      this.productosInventario = this.productos;
    } else {
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].categoria===cat) {
         this.filtrados.push(this.productos[i]);
        }
      }
      console.log(this.filtrados);
      this.productosInventario = this.filtrados;
    }
    
    return this.productosInventario;
  }
}
