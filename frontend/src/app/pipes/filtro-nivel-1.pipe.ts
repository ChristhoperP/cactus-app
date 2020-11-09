import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroNivel1'
})
export class FiltroNivel1Pipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultGenero2 = [];
    for (const especie of value){
      if (especie.descripcion_genero.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultGenero2.push(especie);
      }
    }
    return resultGenero2;
  }


}
