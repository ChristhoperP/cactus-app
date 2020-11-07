import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEspecies'
})
export class FiltroEspeciesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultEspecie = [];
    for (const productos of value){
      if (productos.descripcion_especie.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultEspecie.push(productos);
      }
    }
    return resultEspecie;
  }

}
