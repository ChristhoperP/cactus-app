import { Pipe, PipeTransform } from '@angular/core';
import { constants } from 'buffer';

@Pipe({
  name: 'filtroPrecio'
})
export class FiltroPrecioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPrecio = [];
    const minPrice = (<HTMLInputElement>document.getElementById('filtro1')).value;
        const maxPrice = (<HTMLInputElement>document.getElementById('filtro2')).value;
    
    for (const productos of value){

      if (productos.precio.toLowerCase().indexOf(arg.toLowerCase()) > -1||(productos.precio >= minPrice && productos.precio <= maxPrice)){
              resultPrecio.push(productos);
      }
      
      
    }
  
    
    return resultPrecio;
  }

}
