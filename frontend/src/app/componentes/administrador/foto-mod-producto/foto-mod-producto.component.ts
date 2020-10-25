import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Global } from '../../../servicios/global';

@Component({
  selector: 'app-foto-mod-producto',
  templateUrl: './foto-mod-producto.component.html',
  styleUrls: ['./foto-mod-producto.component.css']
})
export class FotoModProductoComponent implements OnInit {

  @Input() imagen: File | string;

  @Output() delete: EventEmitter<[string, boolean]> = new EventEmitter(true);

  src: string | ArrayBuffer;

  constructor() { }

  ngOnInit(): void {

    if ( this.imagen instanceof File ){
      const fr = new FileReader();

      fr.readAsDataURL(this.imagen);

      fr.onload = () => {
        this.src = fr.result;
      };
    } else {
      this.src = Global.url + 'get-image/' + this.imagen;
    }
  }

  deleteImage(el: HTMLDivElement): void {
    el.parentElement.parentElement.remove();
    if ( this.imagen instanceof File){
      this.delete.emit([this.imagen.name, true]);
    } else {
      this.delete.emit([this.imagen, false]);
    }
  }

}
