
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { ProcesoPagoService } from '../../../servicios/proceso-pago.service';
import { AuthService } from '../../../servicios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';


@Component({
  selector: 'app-informacion-pago',
  templateUrl: './informacion-pago.component.html',
  styleUrls: ['./informacion-pago.component.css']
})
export class InformacionPagoComponent implements OnInit {

  //Stripe
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  stripeTest: FormGroup;

  /////////
  usuario:any='';
  departamentos: any = [];
  municipios: any = [];
  agencias: any = [];
  id_depto: any;

  //
  etapa: number = 1;
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;

  formularioPago:FormGroup = new FormGroup({
    nombre: new FormControl({value: this.usuario.nombre, disabled: true}),

    direccion: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required]),
    agencia: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required])
  });



  constructor(private _pagoService: ProcesoPagoService, private _usuarioService: AuthService, private fb: FormBuilder, private stripeService: StripeService, private router: Router) {
  }


  ngOnInit(): void {
    this._usuarioService.getInfoUsuario()
      .subscribe(res => {
        this.usuario = res;
      });

    this._pagoService.obtenerDepartamentos()
      .subscribe(res => {
        this.departamentos = res;
      });

    this._pagoService.obtenerAgenciasEnvio()
      .subscribe(res => {
        this.agencias = res;       
      });

    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }


  obtenerIDdepto(id: any) {
    console.log(id);
    this.id_depto = id;
    this.obtenerMunicipiosDepartamento(id);
  }
  obtenerMunicipiosDepartamento(id:any): void {
    this._pagoService.obtenerMunicipios()
      .subscribe(res => {
        var municipiosDepa: any = [];
        municipiosDepa = res;      

        this.municipios=municipiosDepa.filter(municipio => municipio.iddepartamento === parseInt(id));
        console.log(this.municipios);      
        });

  }

  registrarInformacion(){
    Swal.fire({
      title: '¿Está seguro que desea continuar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Continuar`,
      cancelButtonText: `Cancelar`,
      confirmButtonColor: `#50a1a5`,
      cancelButtonColor: `red`
    }).then((result) => {
      if (result.isConfirmed) {
        if (
          this.formularioPago.get("direccion").valid &&
          this.formularioPago.get("domicilio").valid &&
          this.formularioPago.get("agencia").valid &&
          this.formularioPago.get("departamento").valid &&
          this.formularioPago.get("municipio").valid
      ) {
        var informacion = {
          "nombrecompleto": this.usuario.nombre, 
          "direccioncompleta": this.formularioPago.get("direccion").value,
          "domicilio": this.formularioPago.get("domicilio").value,
          "idagenciaenvio": this.formularioPago.get("agencia").value,
          "idmunicipio": this.formularioPago.get("municipio").value
        }
        console.log(informacion);
        
          this._pagoService.registrarInformacionEnvio(informacion)
          .subscribe(res => {
            console.log("se registró la información", res);
          },
          err => {
            console.log(err);
          });
        }
      }
    });
  }

  validation(campo) {
    return this.formularioPago.get(campo).invalid && this.formularioPago.get(campo).touched;
  }

  siguiente(): void {
    this.calcularTotal();
    this.etapa = 2;
    this.formularioPago.value.nombre=this.usuario.nombre;
  };

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(this.formularioPago.value);
          console.log(result.token);
          
          this._pagoService.procederPago([this.formularioPago.value, { stripeToken: result.token.id }, this.total, localStorage.getItem('productos')])
            .subscribe(res => {
              console.log(res);

              //Eliminar productos del carrito
              let productosCarrito = JSON.parse(localStorage.getItem('productos'));

              productosCarrito.forEach(element => {
                console.log(element.idproducto);
                this._pagoService.eliminarProductoCarrito(element.idproducto)
                  .subscribe(res => {
                  },
                    err => {
                      console.log(err);
                    });
              });

              //Eliminar los productos del localEstorage
              localStorage.removeItem('productos');

              //mostrar sweet alert de compra exitosa
              Swal.fire({
                icon: 'success',
                title: `Compra por L.${this.total} realizada exitosamente.`
              });

              //Redireccionar al Historial de compras
              this.router.navigate(['/historial-compra']);
            },
              err => {
                console.log(err.error);
                if (err.error.pagoRecibido==0) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al realizar la compra.`
                  });
                }else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Error al registrar el pedido. El pago se realizó correctamente. Contacte con el vendedor.`
                  });
                  this.router.navigate(['/inicio']);
                }
              });
        
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }

      });
  }

  calcularTotal(): void {
    this._pagoService.calcularTotal(localStorage.getItem('productos'), this.formularioPago.value.agencia)
      .subscribe(res => {
        console.log(res);
        this.subtotal = res.subtotal;
        this.envio = res.envio;
        this.total = res.total;
        console.log(this.total);
      },
        err => {
          console.log(err);
        });
  }

}


// INSERT INTO public.agenciaenvio(
// 	idagenciaenvio, nombre, precio, urlperfil)
// 	VALUES (1, 'Cargo Expreso', 115, '');
