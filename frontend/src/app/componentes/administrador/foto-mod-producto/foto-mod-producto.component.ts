import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-foto-mod-producto',
  templateUrl: './foto-mod-producto.component.html',
  styleUrls: ['./foto-mod-producto.component.css']
})
export class FotoModProductoComponent implements OnInit {

  @Input() imagen: File;
  src: string | ArrayBuffer;

  constructor() { }

  ngOnInit(): void {
    const fr = new FileReader();

    fr.readAsDataURL(this.imagen);

    fr.onload = () => {
      this.src = fr.result;
    };

  }

  deleteImage(el: HTMLDivElement): void {
    el.parentElement.parentElement.remove();
  }

}
