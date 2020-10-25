import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/administrador/productos.service';
import Swal, { SweetAlertResult } from 'sweetalert2';


@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  idProducto = '';

  imgPortada: string | ArrayBuffer;
  imagenes = new Array<File>();
  imgsActuales = new Array<string>();
  cantImgs = 0;
  imgLimit = 3;
  sizeLimit = 5242880;
  deletedImgs = new Array<string>();

  categorias: any;
  tiposBases: any;
  listaEspecies: any;

  formularioModificarProducto: FormGroup = new FormGroup({
    idProducto: new FormControl(null, Validators.required),
    nombre: new FormControl(null, Validators.required),
    informacionAdicional: new FormControl(null, Validators.required),
    precio: new FormControl(null, [Validators.required, Validators.min(1)]),
    cantidad: new FormControl(null, [Validators.required, Validators.min(1)]),
    idTipoBase: new FormControl(null, Validators.required),
    tiempoSol: new FormControl(null, Validators.required),
    frecuenciaRiego: new FormControl(null, Validators.required),
    tamanio: new FormControl(null, Validators.required),
    idCategoria: new FormControl(null, Validators.required),
    especiesProducto: new FormControl(null, Validators.required),
    eliminadas: new FormControl(null),
    portada: new FormControl(null),
    gallery: new FormControl(null)
  });

  constructor(
    private productService: ProductosService
  ) { }

  ngOnInit(): void {

    this.productService.getCategorias()
          .subscribe( res => {
            this.categorias = res;
          }, err => {
            console.log(err);
          });

    this.productService.getTiposBases()
          .subscribe( res => {
            this.tiposBases = res;
          }, err => {
            console.log(err);
          });

    this.productService.getEspecies()
          .subscribe( res => {
            this.listaEspecies = res;
          }, err => {
            console.log(err);
          });
  }

  get nombreProducto(): AbstractControl { return this.formularioModificarProducto.get('nombre'); }
  get idCategoria(): AbstractControl { return this.formularioModificarProducto.get('idCategoria'); }
  get idTipoBase(): AbstractControl { return this.formularioModificarProducto.get('idTipoBase'); }
  get tiempoSol(): AbstractControl { return this.formularioModificarProducto.get('tiempoSol'); }
  get frecuenciaRiego(): AbstractControl { return this.formularioModificarProducto.get('frecuenciaRiego'); }
  get tamanio(): AbstractControl { return this.formularioModificarProducto.get('tamanio'); }
  get especies(): AbstractControl { return this.formularioModificarProducto.get('especiesProducto'); }
  get cantidad(): AbstractControl { return this.formularioModificarProducto.get('cantidad'); }
  get precio(): AbstractControl { return this.formularioModificarProducto.get('precio'); }
  get informacionAdicional(): AbstractControl { return this.formularioModificarProducto.get('informacionAdicional'); }
  get portada(): AbstractControl { return this.formularioModificarProducto.get('portada'); }
  get fotosProducto(): [] { return this.formularioModificarProducto.get('gallery').value; }

  setProductInfo( productId: string ): void {
    this.idProducto = productId;

    console.log(this.imgsActuales, this.imagenes);

    this.productService.getProductInfo( this.idProducto )
          .subscribe( res => {
            console.log(res);
            this.formularioModificarProducto.patchValue({
              idProducto: this.idProducto,
              nombre: res[0].nombre,
              idCategoria: this.setCategory(res[0].categoria),
              idTipoBase: this.setBase(res[0].tipobase),
              especiesProducto: [this.setEspecie(res[0].especie).toString()],
              cantidad: res[0].cantidad,
              precio: res[0].precio,
              informacionAdicional: res[0].informacionadicional
            });

            this.imgPortada = 'http://localhost:3000/api/get-image/' + res[0].urlportada;

            const tmpImg = [];
            for (const img of res) {
              tmpImg.push(img.urlimagenes);
              this.cantImgs++;
            }

            this.imgsActuales = tmpImg;

          }, err => {
            console.log(err);
          });
  }

  resetForm(): void {
    this.formularioModificarProducto.reset();
    this.deletedImgs = new Array<string>();
    this.imagenes = new Array<File>();
    this.cantImgs = 0;
    console.log(this.formularioModificarProducto.value);
    console.log(this.deletedImgs, this.imagenes);
  }

  deleteImage(el: HTMLImageElement): void {
    if (confirm('¿Desea eliminar esta imagen?')){
      el.parentElement.parentElement.remove();
    }
  }

  deleteImageByName([name, isFile]): void {

    if (isFile){
      const nImgs = new Array<File>();

      for (const img of this.imagenes) {
        if (img && img.name === name) {
          this.cantImgs--;
        } else {
          nImgs.push(img);
        }
      }
      this.imagenes = nImgs;
      this.formularioModificarProducto.patchValue({gallery: this.imagenes});
    } else {
      this.cantImgs--;
      this.imgsActuales.splice(this.imgsActuales.indexOf(name), 1);
      this.deletedImgs.push(name);
      this.formularioModificarProducto.patchValue({eliminadas: this.deletedImgs});
      this.deleteImageAlert();
    }
  }

  previewPortada(evt: HTMLInputElement): void {

    if (!this.isValidImage(evt.files[0])) {
      this.fileTypeAlert();
    } else {
      if (!this.isValidSize(evt.files[0].size)){
        this.fileSizeAlert();
      } else {
        const fr = new FileReader();
        fr.readAsDataURL(evt.files[0]);

        fr.onload = () => {
          this.imgPortada = fr.result;
          this.formularioModificarProducto.patchValue({fotoPortada: evt.files[0]});
        };
      }
    }
  }

  previewProductImages(evt: HTMLInputElement): void {

    const images: FileList = evt.files;

    if ( (this.cantImgs + evt.files.length) > this.imgLimit){
      this.fileAmountAlert();
    } else {
      for (let i = 0; i < this.imgLimit; i++) {

        if (images.item(i)){

          if ( !this.isValidImage(images.item(i)) ) {
            this.fileTypeAlert();
          } else {
            if (!this.isValidSize(images.item(i).size)){
              this.fileSizeAlert();
            } else {
              this.imagenes[this.imagenes.length] = images.item(i);
              this.cantImgs++;
            }
          }

        }

      }
    }

    this.formularioModificarProducto.patchValue({gallery: this.imagenes});

  }

  mostrarValores(): void {
    console.log(this.formularioModificarProducto.value);
    console.log(this.formularioModificarProducto.valid);
    console.log(this.deletedImgs);
  }

  isValidImage( file: File ): boolean {
    const fileFormat = file.type.split('/')[1];

    if ( fileFormat === 'jpg' || fileFormat === 'jpeg' || fileFormat === 'png' ) {
      return true;
    }

    return false;
  }

  isValidSize( size: number ): boolean {
    return (size <= this.sizeLimit);
  }

  setBase( tipoBase: string ): number {
    for (const base of this.tiposBases) {
      if (base.descripcion === tipoBase){
        return base.idtipobase;
      }
    }
    return -1;
  }

  setCategory( categoria: string ): number {
    for (const cat of this.categorias) {
      if (cat.descripcion === categoria){
        return cat.idcategoria;
      }
    }
    return -1;
  }

  setEspecie( especie: string ): number {
    for (const esp of this.listaEspecies) {
      if (esp.descripcion_especie === especie){
        return esp.idespecie;
      }
    }
    return -1;
  }

  fileSizeAlert(): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `El archivo debe pesar menos de ${Math.round( this.sizeLimit / 1048576 )} MB`
    });
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
      text: `Solo se admiten ${this.imgLimit} imágenes por producto`
    });
  }

  deleteImageAlert(): void {
    Swal.fire({
      title: 'Eliminación pendientes',
      text: 'Los cambios serán permanentes al hacer click en "Guardar cambios"',
      icon: 'info',
      confirmButtonColor: `#50a1a5`
    });
  }
}
