import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroGenero'
})
export class FiltroGeneroPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultGenero = [];
    for (const productos of value){
      if (productos.genero.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultGenero.push(productos);
      }
    }
    return resultGenero;
  }

}
