import { Component, OnInit,ViewChild, ElementRef, Output, EventEmitter  } from '@angular/core';
import { ProductosService } from '../../../servicios/administrador/productos.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Options, ImageResult } from "ngx-image2dataurl";
import {FormControl, FormGroup, Validators, MaxLengthValidator} from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';



@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  @Output() 
  nuevoProducto = new EventEmitter<Object>();

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('myInputPortada') imgPortada: ElementRef;
  @ViewChild('inputGaleria') inputGaleria: ElementRef;

  modalProducto;
  showModalAgregarProducto: boolean = false;

categorias:any = [];
especies:any = [];
tipoBases:any = [];
generos:any= [];
productoAgregado:any;
mostrarFormularioEspecie:boolean = false;


imageChangedEvent: any = '';
croppedImage: any = '';
fileInputPortada: Array <File>;
fileInputGaleria: Array <File>;


firstImage:any = '../../../../assets/img/administrador/portada_icon2.png';
portada: string = '../../../../assets/img/administrador/portada_icon2.png';
multiplesFotos: any;

options: Options = {
  resize: {
    maxHeight: 1697,
    maxWidth: 1200
  },
  allowedExtensions: ['JPG', 'PNG', 'GIF', 'JPEG']
}

cantImgs = 0;
imgLimit = 2;

images: any = [];
galeria:any = [];
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
    this.especies;
    this.images;

   }

  ngOnInit(): void {
    this.portada;


    this._productoService.getCategorias()
    .subscribe((res:any)=> {
        this.categorias = res;
        console.log(this.categorias);
        
      } );

    this._productoService.getEspecies ()
    .subscribe((res:any)=> {
        this.especies = res;
    } );

    this._productoService.getTiposBases ()
    .subscribe((res:any)=> {
        this.tipoBases = res;
    } );

    this._productoService.getGeneros ()
    .subscribe((res:any)=> {
        this.generos = res;
        // console.log(this.generos);
        
    } );

  }

  agregarEspecie(){
    if (this.formularioEspecie.get("especie").valid && this.formularioEspecie.get("genero").valid) {
      var nuevaEspecie = {
        "descripcionEspecie": this.formularioEspecie.get("especie").value,
        "idGenero": this.formularioEspecie.get("genero").value
      }
      console.log(nuevaEspecie);
      
      this._productoService.agregarEspecie(nuevaEspecie)
      .subscribe(res => {
        console.log("se registró una nueva especie");
        console.log(res);
        
        var especieAgregada = {
          "idespecie": res.idespecie,
          "descripcion_especie": this.formularioEspecie.get("especie").value
        }
        this.especies.push(especieAgregada);

        this.alertEspecieAgregada();
        this.formularioEspecie.reset();
        this.mostrarFormularioEspecie = false;
      },
      err => {
        console.log(err);
      }); 
    }
  }

  agregarProducto(){
    if (this.formularioProducto.get("nombre").valid &&
        this.formularioProducto.get("cantidad").valid &&
        this.formularioProducto.get("precio").valid &&
        this.formularioProducto.get("base").valid &&
        this.formularioProducto.get("categoria").valid &&
        this.formularioProducto.get("especies").valid &&
        this.formularioProducto.get("tamanio").valid 
    ) {
        if (this.images !="") {
          let portada =  this.images[this.images.length -1];
          
        let producto = new FormData();
        if (this.galeria.length > 0){
          for (const file of  this.galeria) {
            producto.append("gallery", file.file);
          }
        }

        producto.append("portada", portada.file);
        producto.set('nombre', this.formularioProducto.get("nombre").value);
        producto.set('informacionadicional', this.formularioProducto.get("descripcion").value);
        producto.set('precio', this.formularioProducto.get("precio").value);
        producto.set('cantidad', this.formularioProducto.get("cantidad").value);
        producto.set('tipobase', this.formularioProducto.get("base").value);
        producto.set('tiemposol', this.formularioProducto.get("tiempoSol").value);
        producto.set('frecuenciariego', this.formularioProducto.get("riego").value);
        producto.set('tamanio', this.formularioProducto.get("tamanio").value);
        producto.set('categoria', this.formularioProducto.get("categoria").value);
        producto.set('especie', this.formularioProducto.get("especies").value);

      console.log(producto);

      this._productoService.agregarProducto(producto)
      .subscribe(res => {
        console.log("se registró un nuevo producto");
        console.log(res);
        console.log(this.categorias);
        
        var nombreCategoria = this.categorias.find( categoria => categoria.idcategoria == res.body.categoria);
        // console.log(nombreCategoria);

          var nuevoProducto = {
            "cantidad": res.body.cantidad,
            "categoria": nombreCategoria.descripcion,
            "especie": res.body.especie,
            "idproducto": res.idProducto,
            "informacionadicional": res.body.informacionadicional,
            "nombre": res.body.nombre,
            "precio": res.body.precio,
            "urlportada": res.files.portada[0].filename
          }

        this.alertProductoAgregado();

        this.nuevoProducto.emit(nuevoProducto);
        this.closeAddExpenseModal.nativeElement.click();
        this.imgPortada.nativeElement.value = "";
        this.inputGaleria.nativeElement.value = "";
        this.showModalAgregarProducto=false;
        this.portada= this.firstImage;
        this.images=[];
        this.galeria=[];
        
        this.formularioProducto.reset();
      },
      err => {
        console.log(err);
      });  
        } else{
          this.alertImagenNoCargada();
        }
      
      } 
      else {
        alert("Ocurrió un error, no se ha podido guardar el producto");
      }

  }

  onLoadImg( e ){
    this.imageChangedEvent = e;
    console.log(e);
    this.fileInputPortada = e.target.files;

    const reader = new FileReader();
    reader.onload = e => this.firstImage = reader.result;

    reader.readAsDataURL(this.fileInputPortada[0]);
    this.imageCropped(  this.imageChangedEvent);
  }

  selected(imageResult:ImageResult, tipoFotos) {
    switch (tipoFotos) {
      case 'portada':
                    if (imageResult.error) {
                      this.fileTypeAlert();
                    } else {
                        this.images.push(imageResult);
                        console.log(this.images);
                        this.portada = imageResult.resized && imageResult.resized.dataURL || imageResult.dataURL;
                    }
        break;

        case 'galeria':
                   
                    if (this.galeria.length> this.imgLimit){
                      this.fileAmountAlert();
                    } else {
                        if (imageResult.error){
                          this.fileTypeAlert();
                        } else {
                            this.galeria.push(imageResult);
                            console.log(this.galeria);
                        }
                    }
        break;
    
      default:
        break;
    }
    
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  habilitarFormularioEspecie(){
    this.mostrarFormularioEspecie = true;
  }

  validation(campo){
    return this.formularioProducto.get(campo).invalid && this.formularioProducto.get(campo).touched ;
  }

  validationEspecie(campo){
    return  this.formularioEspecie.get(campo).invalid && this.formularioEspecie.get(campo).touched;
  }

  fileTypeAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Solo se admiten archivos .jpg y .png'
    });
  }

  fileAmountAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Solo se admiten 3 imágenes adicionales por producto`
    });
  }

  alertImagenNoCargada(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Debe seleccionar una portada`
    });
  }

  alertProductoAgregado(): void {
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado exitosamente',
    });
  }

  alertEspecieAgregada(): void {
    Swal.fire({
      icon: 'success',
      text: 'Especie agregada exitosamente',
    });
  }


}