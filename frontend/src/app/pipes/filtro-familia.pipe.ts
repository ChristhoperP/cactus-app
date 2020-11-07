import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroFamilia'
})
export class FiltroFamiliaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultFamilia = [];
    for (const productos of value){
      if (productos.familia.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultFamilia.push(productos);
      }
    }
    return resultFamilia;
  }
}
