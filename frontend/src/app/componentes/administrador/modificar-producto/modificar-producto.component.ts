import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/administrador/productos.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  @ViewChild('closeModal') closeModal: ElementRef;

  idProducto = '';

  imgPortada: string | ArrayBuffer;
  imagenes = new Array<File>();
  imgsActuales = new Array<string>();
  idsImgsActuales = new Array<number>();
  cantImgs = 0;
  imgLimit = 3;
  sizeLimit = 5242880;
  deletedImgs = new Array<number>();

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
    eliminadas: new FormControl(new Array<number>()),
    portada: new FormControl(null),
    gallery: new FormControl(new Array<File>())
  });

  constructor(
    private productService: ProductosService,
    private router: Router
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
  get imgsEliminadas(): AbstractControl { return this.formularioModificarProducto.get('eliminadas'); }

  setProductInfo( productId: string ): void {
    this.idProducto = productId;

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
              informacionAdicional: res[0].informacionadicional,
              tiempoSol: res[0].tiemposol,
              frecuenciaRiego: res[0].frecuenciariego,
              tamanio: res[0].tamanio// ,
              // portada: res[0].urlportada
            });

            this.imgPortada = 'http://localhost:3000/api/get-image/' + res[0].urlportada;

            const tmpImg = [];
            for (const img of res[0].galeria) {
              tmpImg.push(img);
              this.cantImgs++;
            }

            this.imgsActuales = res[0].galeria;
            this.idsImgsActuales = res[0].idimagen;

          }, err => {
            console.log(err);
          });
  }

  resetForm(): void {
    this.idProducto = null;
    console.log(this.idProducto);
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
      --this.cantImgs;
      this.deletedImgs.push(this.idsImgsActuales[this.imgsActuales.indexOf(name)]);
      this.formularioModificarProducto.patchValue({eliminadas: this.deletedImgs});
      this.deleteImageAlert();
      this.imgsActuales.splice(this.imgsActuales.indexOf(name), 1);
    }
  }

  findDeletedImage( name: string ): number {
    for (let i = 0; i < this.imgsActuales.length; i++) {
      if (this.imgsActuales[i] === name) {
        return i;
      }
      return -1;
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
          this.formularioModificarProducto.patchValue({portada: evt.files[0]});
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
    /* const producto = {
      idProducto: this.idProducto,
      nombre: this.nombreProducto.value,
      informacionAdicional: this.informacionAdicional.value,
      precio: this.precio.value,
      cantidad: this.cantidad.value,
      idTipoBase: this.idTipoBase.value,
      tiempoSol: this.tiempoSol.value,
      frecuenciaRiego: this.frecuenciaRiego.value,
      tamanio: this.tamanio.value,
      idCategoria: this.idCategoria.value,
      especiesProducto: this.especies.value,
      eliminadas: this.imgsEliminadas.value,
      portada: this.portada.value,
      gallery: this.fotosProducto
    }; */

    const producto = new FormData();

    producto.append('idProducto', this.idProducto);
    producto.append('nombre', this.nombreProducto.value);
    producto.append('informacionAdicional', this.informacionAdicional.value);
    producto.append('precio', this.precio.value);
    producto.append('cantidad', this.cantidad.value);
    producto.append('idTipoBase', this.idTipoBase.value);
    producto.append('tiempoSol', this.tiempoSol.value);
    producto.append('frecuenciaRiego', this.frecuenciaRiego.value);
    producto.append('tamanio', this.tamanio.value);
    producto.append('idCategoria', this.idCategoria.value);
    // producto.append('especiesProducto', this.especies.value);
    // producto.append('eliminadas', this.imgsEliminadas.value);
    // producto.append('portada', this.portada.value);

    if (this.fotosProducto && this.fotosProducto.length > 0){
      for (const img of this.fotosProducto) {
        producto.append('gallery', img);
      }
    }

    if (this.portada.value) {
      producto.append('portada', this.portada.value);
      console.log(this.portada);
    }

    for (let i = 0; i < this.imgsEliminadas.value.length; i++) {
      producto.append('eliminadas[]', this.imgsEliminadas.value[i]);
    }

    for (let i = 0; i < this.especies.value.length; i++) {
      producto.append('especiesProducto[]', this.especies.value[i]);
    }

    console.log(this.deletedImgs);



    // console.log(producto);
    // console.log(this.formularioModificarProducto.value, this.formularioModificarProducto.valid);

    this.productService.updateProduct(producto)
      .subscribe( res => {
        console.log(res);
        Swal.fire({
          title: 'Cambios guardados exitosamente!',
          icon: 'success',
          confirmButtonColor: `#50a1a5`
        });
        this.closeModal.nativeElement.click();
        this.reloadComponent();
      }, err => {
        console.log(err);
      });

    // console.log(producto);
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

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['controlador-admin/inventario']);
  }
}
