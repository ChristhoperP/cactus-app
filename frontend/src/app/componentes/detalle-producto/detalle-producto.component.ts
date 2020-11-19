import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {DetalleProductoService} from 'src/app/servicios/detalle-producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Global} from '../../servicios/global';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosFrontService } from 'src/app/servicios/productos-front.service';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import {ServAdminService} from 'src/app/servicios/administrador/serv-admin.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  public url: string;
  producto: any;
  id: string;
  cargando: boolean = true;

  @ViewChild('toast') addedToast: ElementRef<HTMLDivElement>;
  @ViewChild('alertToast') alertToast: ElementRef<HTMLDivElement>;

  formularioCaracteristicas: FormGroup = new FormGroup({
    cantidad: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
  });




  constructor(
    private ServicioDetalle: DetalleProductoService,
    private ServicioProductos: ProductosFrontService,
    private ServicioAuth: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _cargar: ServAdminService) { 
      this.url = Global.url;
      _cargar.Carga(["galeria"]);

      this.id = this._route.snapshot.paramMap.get('id');
      this._route.params.subscribe(paramst =>{
        console.log(paramst['id']);
      })
    }

  ngOnInit(): void {


    this.ServicioDetalle.getDetalle_Producto(this.id).subscribe((data: any) => {
      this.producto = data[0];
      this.cargando = false;
      this.cantidad.setValidators([Validators.required, Validators.min(1), Validators.max(this.producto.cantidad)]);
      this.cantidad.updateValueAndValidity();
      console.log(data);
    });

  }

  onBack(): void{
    this._router.navigate(['/productos']);
  }

  get cantidad(): AbstractControl { return this.formularioCaracteristicas.get('cantidad'); }

  agregarCarrito(): void {

    if (!this.cantidad.errors?.min && !this.cantidad.errors?.max && !this.cantidad.errors?.required) {

      if (this.ServicioAuth.loggedIn()){
        this.ServicioProductos.addToCartLogged(this.id, this.cantidad.value)
        .subscribe( res => {
          console.log(res);
          this.mostrarAddedToast();
        }, err => { console.log(err); });
      } else {
        const res = this.ServicioProductos.addToCartNoLogged(this.id, this.cantidad.value);

        if (res) {
          this.mostrarAddedToast();
        } else {
          this.mostrarAlertToast();
        }
      }
    } else {
      Swal.fire({
        title: 'Ingrese la Cantidad',
        icon: 'warning',
        confirmButtonColor: `#50a1a5`
      });
    }
  }

  mostrarAddedToast(): void {
    this.addedToast.nativeElement.style.opacity = '1';
    setTimeout(() => { this.addedToast.nativeElement.style.opacity = '0'; }, 3000);
  }

  mostrarAlertToast(): void {
    this.alertToast.nativeElement.style.opacity = '1';
    setTimeout(() => { this.alertToast.nativeElement.style.opacity = '0'; }, 3000);
  }

}
