import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../servicios/administrador/productos.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Options, ImageResult } from "ngx-image2dataurl";
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';



@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
categorias:any = [];
especies:any = [];
tipoBases:any = [];
generos:any = [];
productos:any=[];


imageChangedEvent: any = '';
croppedImage: any = '';
fileInput: Array <File>;
firstImage:any = 'assets/img/portada_icon.png';
portada: any = "../../../../assets/img/administrador/portada_icon.png";
multiplesFotos: string = "../../../../assets/img/administrador/fotos.jpg";

options: Options = {
  resize: {
    maxHeight: 1697,
    maxWidth: 1200
  },
  allowedExtensions: ['JPG', 'PNG']
}

images: any = [];
imagenPortada;

formularioProducto:FormGroup = new FormGroup({
  nombre: new FormControl('', [Validators.required]),
  cantidad: new FormControl('', [Validators.required]),
  precio: new FormControl('',[Validators.required]),
  base: new FormControl('', [Validators.required]),
  categoria: new FormControl('', [Validators.required]),
  especies: new FormControl('', [Validators.required]),
  tiempoSol: new FormControl(''),
  riego: new FormControl(''),
  tamanio: new FormControl('', [Validators.required]),
  descripcion: new FormControl('')

});

formularioEspecie:FormGroup = new FormGroup({
  especie: new FormControl('', [Validators.required]),
  genero: new FormControl('', [Validators.required])
});



  constructor( private _productoService: ProductosService) {
   }

  ngOnInit(): void {
    this.portada;


    this._productoService.getCategorias()
    .subscribe((res:any)=> {
        this.categorias = res;
      } );

    this._productoService.getEspecies ()
    .subscribe((res:any)=> {
        this.especies = res;
    } );

    this._productoService.getTiposBases ()
    .subscribe((res:any)=> {
        this.tipoBases = res;
    } );
  }

  onLoadImg( e ){
    this.imageChangedEvent = e;
    console.log(e);
    this.fileInput = e.target.files;

    const reader = new FileReader();
    reader.onload = e => this.firstImage = reader.result;

    reader.readAsDataURL(this.fileInput[0]);
    this.imageCropped(  this.imageChangedEvent);
  }

  selected(imageResult:ImageResult, tipoFotos) {
    console.log('fuera joh');
    
    if (imageResult.error) alert(imageResult.error);
    this.images.push(imageResult);
    console.log(this.images);

    this.portada = imageResult.resized && imageResult.resized.dataURL || imageResult.dataURL;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  validation(campo){
    return this.formularioProducto.get(campo).invalid && this.formularioEspecie.get(campo).invalid;
  }

  validationEspecie(campo){
    return  this.formularioEspecie.get(campo).invalid;
  }

}
