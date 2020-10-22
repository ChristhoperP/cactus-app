import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/administrador/productos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  imgPortada: string | ArrayBuffer;
  imagenes = new Array<File>();
  cantImgs = 0;
  imgLimit = 3;
  sizeLimit = 5242880;

  categorias: any;
  tiposBases: any;
  listaEspecies: any;

  formularioModificarProducto: FormGroup = new FormGroup({
    nombreProducto: new FormControl(null, Validators.required),
    categoria: new FormControl(3, Validators.required),
    base: new FormControl(2, Validators.required),
    especies: new FormControl(['1', '3'], Validators.required),
    cantidad: new FormControl(null, [Validators.required, Validators.min(1)]),
    precio: new FormControl(null, [Validators.required, Validators.min(1)]),
    descripcion: new FormControl(null, Validators.required),
    fotoPortada: new FormControl(null),
    fotosProducto: new FormControl(null)
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
            // this.listaEspecies = res;
            console.log(res);
          }, err => {
            console.log(err);
          });
  }

  get nombreProducto(): AbstractControl { return this.formularioModificarProducto.get('nombreProducto'); }
  get categoria(): AbstractControl { return this.formularioModificarProducto.get('categoria'); }
  get base(): AbstractControl { return this.formularioModificarProducto.get('base'); }
  get especies(): AbstractControl { return this.formularioModificarProducto.get('especies'); }
  get cantidad(): AbstractControl { return this.formularioModificarProducto.get('cantidad'); }
  get precio(): AbstractControl { return this.formularioModificarProducto.get('precio'); }
  get descripcion(): AbstractControl { return this.formularioModificarProducto.get('descripcion'); }
  get fotoPortada(): AbstractControl { return this.formularioModificarProducto.get('fotoPortada'); }
  get fotosProducto(): File[] { return this.formularioModificarProducto.get('fotosProducto').value; }

  deleteImage(el: HTMLImageElement): void {
    if (confirm('¿Desea eliminar esta imagen?')){
      el.parentElement.parentElement.remove();
    }
  }

  deleteImageByName(name: string): void {

    const nImgs = new Array<File>();

    for (const img of this.imagenes) {
      if (img && img.name === name) {
        --this.cantImgs;
      } else {
        nImgs.push(img);
      }
    }

    this.imagenes = nImgs;
    this.formularioModificarProducto.patchValue({fotosProducto: this.imagenes});
  }

  resetForm(): void {
    this.formularioModificarProducto.reset();
    this.imagenes = new Array<File>(3);
    this.cantImgs = 0;
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
              this.imagenes[this.cantImgs] = images.item(i);
              this.cantImgs++;
            }
          }

        }

      }
    }

    this.formularioModificarProducto.patchValue({fotosProducto: this.imagenes});

  }

  mostrarValores(): void {
    console.log(this.formularioModificarProducto.value);
    console.log(this.formularioModificarProducto.valid);
  }

  isValidImage( file: File ): boolean {
    const fileFormat = file.type.split('/')[1];

    if ( fileFormat === 'jpeg' || fileFormat === 'png' ) {
      return true;
    }

    return false;
  }

  isValidSize( size: number ): boolean {
    return (size <= this.sizeLimit);
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

}
