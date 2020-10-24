import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuario'
})
export class FiltroUsuarioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultUsuarios = [];

    for (const usuario of value){
      if (usuario.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultUsuarios.push(usuario);
      }
    }
    return resultUsuarios;
  }

}
