import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit {

  imgPortada: string | ArrayBuffer;
  imagenes: File[] | FileList = [];

  formularioModificarProducto: FormGroup = new FormGroup({
    nombreProducto: new FormControl(null, Validators.required),
    categoria: new FormControl(null, Validators.required),
    base: new FormControl(null, Validators.required),
    especies: new FormControl(null, Validators.required),
    cantidad: new FormControl(null, [Validators.required, Validators.min(1)]),
    precio: new FormControl(null, [Validators.required, Validators.min(1)]),
    descripcion: new FormControl(null, Validators.required),
    fotoPortada: new FormControl(null),
    fotosProducto: new FormControl(null)
  });

  constructor() { }

  ngOnInit(): void {

  }

  deleteImage(el: HTMLImageElement): void {
    console.log(el);
    console.log(el.src);
    if (confirm('¿Desea eliminar esta imagen?')){
      // el.style.display = 'none';
      el.parentElement.parentElement.remove();
    }
  }

  resetForm(): void {
    this.formularioModificarProducto.reset();
  }

  previewPortada(evt: HTMLInputElement): void {

    const fr = new FileReader();
    fr.readAsDataURL(evt.files[0]);

    fr.onload = () => {
      this.imgPortada = fr.result;
      this.formularioModificarProducto.patchValue({fotoPortada: evt.files[0]});
    };
    // console.log(evt);
  }

  get imgsProducto(): FileList { return this.formularioModificarProducto.get('fotosProducto').value; }

  previewProductImages(evt: HTMLInputElement): void {

    const images: FileList = evt.files;

    console.log(this.imgsProducto);

    this.formularioModificarProducto.patchValue({fotosProducto: evt.files});
    this.imagenes = evt.files;

  }

  mostrarValores(): void {
    console.log(this.formularioModificarProducto.value);
  }

}
