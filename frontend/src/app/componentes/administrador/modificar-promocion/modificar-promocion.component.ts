import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PromocionesService } from 'src/app/servicios/administrador/promociones.service';
import Swal from 'sweetalert2';
import { Global } from "src/app/servicios/global";

@Component({
  selector: 'app-modificar-promocion',
  templateUrl: './modificar-promocion.component.html',
  styleUrls: ['./modificar-promocion.component.css']
})
export class ModificarPromocionComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;

  @Output() updatedPromo = new EventEmitter<object>();

  promocionActual: any;

  formModPromocion: FormGroup = new FormGroup({
    idpromocion: new FormControl(null, Validators.required),
    porcentajedescuento: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    fechafin: new FormControl(null, [Validators.required, Validators.minLength(4)])
  });

  public url:string;

  constructor(
    private _promoService: PromocionesService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  get idpromocion(): AbstractControl { return this.formModPromocion.get('idpromocion'); }
  get porcentajedescuento(): AbstractControl { return this.formModPromocion.get('porcentajedescuento'); }
  get fechafin(): AbstractControl { return this.formModPromocion.get('fechafin'); }

  setPromo(promo: any): void {
    const fecha: Date = new Date(promo.fechafin);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    console.log(fecha, dia, mes, anio);

    this.promocionActual = promo;
    this.formModPromocion.patchValue({
      idpromocion: this.promocionActual.promocion_idpromocion,
      porcentajedescuento: this.promocionActual.porcentajedescuento,
      fechafin: anio + '-' + mes.toString().padStart(2, '0') + '-' + dia.toString().padStart(2, '0')
    });
  }

  updatePromo(): void {
    console.log(this.formModPromocion.value);

    this._promoService.modificarPromocion(this.formModPromocion.value)
      .subscribe(res => {
        console.log(res);
        this.successAlert();
        this.closeModal.nativeElement.click();
        this.updatedPromo.emit(res.respuesta[0]);
      }, err => {
        console.log(err);
        this.errorAlert('No se pudo actualizar la promoción :(');
      });
  }

  resetForm(): void {
    this.formModPromocion.reset();
  }

  successAlert(): void {
    Swal.fire({
      title: 'Cambios guardados exitosamente!',
      icon: 'success',
      confirmButtonColor: `#50a1a5`
    });
  }

  errorAlert(msg: string): void {
    Swal.fire({
      title: 'Ha ocurrido un error',
      text: msg,
      icon: 'error',
      confirmButtonColor: `#dc3545`
    });
  }

}
