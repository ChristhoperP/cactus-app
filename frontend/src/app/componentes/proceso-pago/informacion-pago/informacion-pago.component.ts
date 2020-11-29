import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import { ProcesoPagoService } from '../../../servicios/proceso-pago.service';

@Component({
  selector: 'app-informacion-pago',
  templateUrl: './informacion-pago.component.html',
  styleUrls: ['./informacion-pago.component.css']
})
export class InformacionPagoComponent implements OnInit {
  departamentos:any = [];
  municipios:any = [];
  agencias:any = [];
  id_depto:any;


  formularioPago:FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    domicilio: new FormControl('', [Validators.required]),
    agencia: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    municipio: new FormControl('', [Validators.required])
  });  

  constructor(private _pagoService: ProcesoPagoService) {
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
  }

  obtenerIDdepto(id:any){
    console.log(id);
    this.id_depto = id;
    this.obtenerMunicipiosDepartamento(id);
  }


  obtenerMunicipiosDepartamento(id:any):void{
    this._pagoService.obtenerMunicipios()
    .subscribe(res => {
       var municipiosDepa:any = [];  
       municipiosDepa = res;    

    this.municipios=municipiosDepa.filter(municipio => municipio.iddepartamento === 15);
    console.log(this.municipios);      
    });
  }


  validation(campo){
    return this.formularioPago.get(campo).invalid && this.formularioPago.get(campo).touched;
  }

}
