import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  formularioInicioSesion: FormGroup = new FormGroup({
    correo: new FormControl(null, Validators.required),
    contrasenia: new FormControl(null, Validators.required)
  });

  errorCredenciales: Boolean = false;

  constructor(
    private servicioAuth: AuthService,
    private servicioCarrito: CarritoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get correo() { return this.formularioInicioSesion.get('correo') };
  get contrasenia() { return this.formularioInicioSesion.get('contrasenia') };

  validarCampo(campo: string) {
    return this.formularioInicioSesion.get(campo).invalid && this.formularioInicioSesion.get(campo).touched;
  }

  iniciarSesion() {
    this.errorCredenciales = false;

    if (this.formularioInicioSesion.invalid) {
      return;
    }

    this.servicioAuth.iniciarSesion(this.formularioInicioSesion.value)
        .subscribe(res => {
          this.servicioAuth.setToken(res.token);
          this.servicioAuth.setUserRole(res.rol);

          if (res.rol === 'admin' ){
            this.router.navigate(['/controlador-admin']);
          } else {

            if (localStorage.getItem('productos-carrito')){
              const carrito = JSON.parse(localStorage.getItem('productos-carrito'));
              let agregados = 0;
              let cantidad = 0;

              this.servicioCarrito.obtenerProductosCarrito()
              .subscribe(( resps: any) => {
                this.servicioCarrito.setCantidadProductos(resps.length);
              }, err => { console.log(err);});

              for (const producto of carrito) {
                this.servicioCarrito.agregarCarritoLogged(producto.idproducto, producto.cantidadencarrito)
                  .subscribe( resp => {
                    console.log(resp);
                    agregados++;
                    cantidad += parseInt(producto.cantidadencarrito, 10);

                    if (agregados === carrito.length){
                      localStorage.removeItem('productos-carrito');
                      
                      if (!this.route.snapshot.paramMap.get('pago')){
                        this.router.navigate(['/inicio']);
                      } else {
                        this.router.navigate(['../carrito']);
                      }

                      this.servicioCarrito.setCantidadProductos(cantidad);

                      this.servicioCarrito.obtenerProductosCarrito()
                      .subscribe(( resps: any) => {
                        this.servicioCarrito.setCantidadProductos(resps.length);
                      }, err => { console.log(err);});
                    }
                  }, err => {
                    console.log(err);
                  });
              }
            } else {
              this.router.navigate(['/inicio']);
            }
          }
        },
        err => {
          console.log(err);
          this.errorCredenciales = true;
        });
  }


}
