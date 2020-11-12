import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { PromocionesService } from '../../../servicios/administrador/promociones.service';



@Component({
  selector: 'app-agregar-promocion',
  templateUrl: './agregar-promocion.component.html',
  styleUrls: ['./agregar-promocion.component.css']
})
export class AgregarPromocionComponent implements OnInit {
  @ViewChild('closeAddExpenseModalPromocion') closeAddExpenseModalPromocion: ElementRef;
  modalPromocion;
  showModalAgregarPromocion: boolean = true;

  idProducto:any;
  descripcion:any;
  promociones = [];   
  OpenModal:any;

  
  formularioPromocion:FormGroup = new FormGroup({
    fechainicio: new FormControl('', [Validators.required]),
    fechafin: new FormControl('',[Validators.required]),
    porcentajedescuento: new FormControl('', [Validators.required])
  });
  constructor( private _promocionService : PromocionesService ) {
    this._promocionService.getPromociones()
    .subscribe( (res: any) => {
        this.promociones = res;
        console.log(res);
      } );
   }

  ngOnInit(): void {
  

  }

  getProductInfo( productId: string, nombre: string ): void {
    let flag = false;
      if (this.promociones.length > 0) {    
        for (const id in this.promociones) {
          console.log('baniese signe :D');
          
          if (this.promociones[id].idproducto ===productId) {
            flag = true;
            break;
          }
        }
        if (flag) {
          this.showModalAgregarPromocion = false;
          console.log(this.showModalAgregarPromocion);
          
          this.alertPromocionYaExiste();
          this.OpenModal = "";
        }
        else{
          this.OpenModal = "addDiscountModal";
        }
      } else {
        this.OpenModal = "addDiscountModal";
      }
      this.idProducto = productId;
      this.descripcion = nombre;

      console.log(productId, nombre );
      console.log(this.showModalAgregarPromocion);

  }

  agregarPromocion(){
    if (this.formularioPromocion.get('fechainicio').valid &&
        this.formularioPromocion.get('fechafin').valid &&
        this.formularioPromocion.get('porcentajedescuento').valid
    ) {
      var nuevaPromocion = {
        "idproducto": this.idProducto, 
        "descripcion": this.descripcion, 
        "fechainicio": this.formularioPromocion.get('fechainicio').value, 
        "fechafin": this.formularioPromocion.get('fechafin').value, 
        "porcentajedescuento": this.formularioPromocion.get('porcentajedescuento').value
      }
      console.log(nuevaPromocion);
      

      this._promocionService.agregarPromocion(nuevaPromocion)
      .subscribe(res => {
        this.promociones.push(res.body);
        this.alertPromocionAgregada();
        this.formularioPromocion.reset();
        this.closeAddExpenseModalPromocion.nativeElement.click();
        this.showModalAgregarPromocion = false;

      },
      err => {
        console.log(err);
      }); 
    }
  }

  validation(campo){
    return this.formularioPromocion.get(campo).invalid && this.formularioPromocion.get(campo).touched ;
  }

  alertPromocionAgregada(): void {
    Swal.fire({
      icon: 'success',
      title: 'Promoción agregada exitosamente',
    });
  }

  alertPromocionYaExiste(): void {
    Swal.fire({
      icon: 'warning',
      title: 'No se puede agregar',
      text: 'Este producto ya cuenta con una promoción'
    });
  }

}
