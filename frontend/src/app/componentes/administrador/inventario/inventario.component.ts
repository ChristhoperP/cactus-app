import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../servicios/administrador/productos.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Global } from "../../../servicios/global";
import { Router } from '@angular/router';
import { PeticionesService } from 'src/app/servicios/peticiones.service';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

categorias:any = [];
productos:any = [];
productosFilterByName: any = { nombre: '' };
productosFilterByCategoria: any = { categoria: '' };
public url: string;

productId: number;
idproductos: number[];

productosInventario: any = [];
categoriaSeleccionada;
filtrados=[];

  constructor(
    private _productoService: ProductosService,
    private _peticionesServive: PeticionesService,
    private filter: FilterPipe,
    private router: Router
    ) {
    this.url = Global.url;
    this.productos;
   }

  ngOnInit(): void {
    this._productoService.getProductos()
    .subscribe( (res: any) => {
        this.productos = res;
        console.log(res);
        this.productosInventario = this.productos;
        console.log(this.productosInventario);
      } );

    this._productoService.getCategorias()
      .subscribe((res:any) => {
          this.categorias = res;
        } );

  }

  deleteProduct( productId: string, count: number ): void {
    console.log(productId, count);

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

        this._productoService.getProductInfo( productId )
          .subscribe( res => {

            let gallery = [];

            if (res[0].galeria) {
              gallery = res[0].galeria;
            }

            if (res[0].urlportada) {
              gallery.push(res[0].urlportada);
            }

            console.log('Arreglo imagenes: ' + gallery);

            for (const img of gallery) {
              this._peticionesServive.eliminarImagenProducto(img)
              .subscribe( res1 => {
                console.log(res1);
              }, err1 => {
                console.log(err1);
              });
            }


            this._productoService.deleteProduct( productId )
              .subscribe( resp => {
                console.log(resp);
                this.deleteFromArray( productId );
                if (count === 1){
                  Swal.fire({
                    title: 'Producto eliminado!',
                    icon: 'success',
                    confirmButtonColor: `#50a1a5`
                  });
                }
                // this.router.navigate(['controlador-admin/inventario']);
                // this.reloadComponent();
              }, err2 => {
                console.log(err2);
              });

          }, err => {
            console.log(err);
          });

        /* this._productoService.deleteProduct( productId )
          .subscribe( resp => {
            if (count === 1){
              Swal.fire({
                title: 'Producto eliminado!',
                icon: 'success',
                confirmButtonColor: `#50a1a5`
              });
            }
            // this.router.navigate(['controlador-admin/inventario']);
            this.deleteFromArray( productId );
            // this.reloadComponent();
          }, err2 => {
            console.log(err2);
          }); */
      }
    });
  }

  deleteProducts(): void {
    console.log(this.idproductos.length, this.idproductos);

    if (this.idproductos && this.idproductos.length >= 1){
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

          this.idproductos.forEach( id => {

          this._productoService.getProductInfo( id )
            .subscribe( res => {

              let gallery = [];

              if (res[0].galeria) {
                gallery = res[0].galeria;
              }

              if (res[0].urlportada) {
                gallery.push(res[0].urlportada);
              }

              console.log('Arreglo imagenes: ' + gallery);

              for (const img of gallery) {
                this._peticionesServive.eliminarImagenProducto(img)
                .subscribe( res1 => {
                  console.log(res1);
                }, err1 => {
                  console.log(err1);
                });
              }

            }, err2 => {
              console.log(err2);
            });

          this._productoService.deleteProduct(id)
            .subscribe(resp => {
              console.log(resp);
              this.deleteFromArray(id.toString(10));
            }, err => {
              console.log(err);
            });
          });
          /* for (const product of this.idproductos) {
            this.deleteProduct(product, this.idproductos.length);
          } */

          Swal.fire({
            title: 'Productos eliminados!',
            icon: 'success',
            confirmButtonColor: `#50a1a5`
          });
          // this.reloadComponent();
        }
      });
    } else {
      this.emptyProductAlert();
    }

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

  recibeNuevoProducto(producto){
    console.log(producto);
    this.productos.push(producto);
  }

  setProductId( id: number ): void {
    const sel = this.getSelectedProducts();
    this.idproductos = sel;
  }

  getSelectedProducts(): number[] {
    const checks: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"');
    const ths: NodeListOf<HTMLTableHeaderCellElement> = document.querySelectorAll('.product-id');
    const ids = [];

    for (let i = 0; i < checks.length; i++) {
       if (checks[i].checked){
         ids.push(parseInt(ths[i].innerText, 10));
       }
    }
    return ids;
  }

  emptyProductAlert(): void{
    Swal.fire({
      title: 'Atención!',
      text: 'Debe seleccionar un producto',
      icon: 'warning',
      confirmButtonColor: `#50a1a5`
    });
  }

  manyProductsAlert(): void{
    Swal.fire({
      title: 'Atención!',
      text: 'Solo puede modificar un archivo a la vez',
      icon: 'warning',
      confirmButtonColor: `#50a1a5`
    });
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['controlador-admin/inventario']);
  }

  deleteFromArray( id: string ): void {

    console.log('Id a eliminar: ' + id/* , this.productos */);


    for (let i = 0; i < this.productos.length; i++) {
      if ( this.productos[i].idproducto === id){
        console.log('Eliminando: ' + id + ' / ' + this.productos[i]);
        this.productos.splice(i, 1);
      }
    }

    // this.productos = this.productos.filter( item => item.idproducto !== id.toString());

  }

  getProductSelectedInfo(id, nombre){
    console.log(id, nombre);
    return id;
    
  }

}
