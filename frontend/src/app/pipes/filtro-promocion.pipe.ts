import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPromocion'
})
export class FiltroPromocionPipe implements PipeTransform {

  transform(value: any, arg: any): any  {
    const resultPromo = [];
    
    for (const promo of value){
      if (promo.nombrecategoria.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPromo.push(promo);
      }
    }
    return resultPromo;
  }

}
