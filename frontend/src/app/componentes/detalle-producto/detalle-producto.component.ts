import { Component, OnInit } from '@angular/core';
import {DetalleProductoService} from 'src/app/servicios/detalle-producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Global} from '../../servicios/global';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  public url: string;
  producto: any;
  id:string;
  cargando:boolean=true;


  constructor(private ServicioDetalle: DetalleProductoService
    , private _route: ActivatedRoute,
    private _router: Router) { 
      this.url = Global.url;
      this.id = this._route.snapshot.paramMap.get('id');
      this._route.params.subscribe(paramst =>{
        console.log(paramst['id']);
      })
    }

  ngOnInit(): void {


    this.ServicioDetalle.getDetalle_Producto(this.id).subscribe((data: any) => {
      this.producto = data[0];
      this.cargando=false;
      console.log(data);
    });
  }

  

}
