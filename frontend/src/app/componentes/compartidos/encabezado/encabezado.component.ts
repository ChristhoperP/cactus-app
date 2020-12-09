import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { BusquedaProductosService } from 'src/app/servicios/busqueda-productos.service';
import { CarritoService } from 'src/app/servicios/carrito.service';


@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  nombreUsuario: any;
  cantidadProductos: number;

  terminoBusqueda = '';

  @Input() nombreActualizado: any;

  constructor(
    public authService: AuthService,
    private busquedaService: BusquedaProductosService,
    private carritoService: CarritoService,
    private router: Router) {
      this.cantidadProductos;
    }

  ngOnInit(): void {

    if (this.authService.loggedIn() === true){
      this.authService.getInfoUsuario().subscribe((data: any) => {
        this.nombreUsuario = data.nombre;
        console.log(data);
      });
    }

    this.authService.updatedName.subscribe( newName => {
      this.nombreActualizado = newName;
    } );

    this.carritoService.cantidadProductos.subscribe( cantidad => {
      this.cantidadProductos = cantidad;
    });
    
    this.cantidadProductos = this.carritoService.getCantidadProductos();
  }

  searchProducts(): void {
    this.busquedaService.searchProducts( this.terminoBusqueda);
  }

  cerrarSesion(){
    this.authService.logoutUser();
    localStorage.removeItem('productos-carrito');
  }

}
