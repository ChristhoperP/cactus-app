import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filtro-ingresos',
  templateUrl: './filtro-ingresos.component.html',
  styleUrls: ['./filtro-ingresos.component.css']
})
export class FiltroIngresosComponent implements OnInit {
@ViewChild('Form') addPropertyForm: NgForm;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(Form : NgForm){
    console.log('Se pueden ver');
    console.log(this.addPropertyForm);
  }

}
