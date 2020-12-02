import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { ProcesoPagoService } from '../../../servicios/proceso-pago.service';
import Swal from 'sweetalert2';

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

  departamentos: any = [];
  municipios: any = [];
  agencias: any = [];
  id_depto: any;

  //
  etapa: number = 1;
  subtotal: number = 0;
  envio: number = 0;
  total: number = 0;

  formularioPago: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required]),
    agencia: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required])
  });

  constructor(private _pagoService: ProcesoPagoService, private fb: FormBuilder, private stripeService: StripeService) {
  }

  ngOnInit(): void {
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


  obtenerMunicipiosDepartamento(id: any): void {
    this._pagoService.obtenerMunicipios()
      .subscribe(res => {
        var municipiosDepa: any = [];
        municipiosDepa = res;

        this.municipios = municipiosDepa.filter(municipio => municipio.iddepartamento === 15);
        console.log(this.municipios);
      });
  }


  validation(campo) {
    return this.formularioPago.get(campo).invalid && this.formularioPago.get(campo).touched;
  }

  siguiente(): void {
    this.calcularTotal();
    this.etapa = 2;
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

          this._pagoService.procederPago([this.formularioPago.value, { stripeToken: result.token.id }, this.total])
            .subscribe(res => {
              console.log(res);
              /* if (res.rol === 'admin') {
                this.router.navigate(['/controlador-admin']);
              } else {
                this.router.navigate(['/inicio']);
              } */

              //mostrar sweet alert de compra exitosa
              Swal.fire({
                icon: 'success',
                title: `Compra por L.${this.total} realizada exitosamente.`
              });
            },
              err => {
                console.log(err);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: `No se pudo realizar la compra.`
                });
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
        this.subtotal=res.subtotal;
        this.envio=res.envio;
        this.total=res.total;
        console.log(this.total);
      },
        err => {
          console.log(err);
        });
  }

}
