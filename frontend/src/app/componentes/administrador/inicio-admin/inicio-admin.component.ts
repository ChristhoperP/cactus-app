import { Component, OnInit } from '@angular/core';
import {ServAdminService} from '../../../servicios/administrador/serv-admin.service';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {
  visits: any;
  user: any;
  constructor(private serviceAdmin: ServAdminService) { }

  ngOnInit(): void {
    this.serviceAdmin.getVisits().subscribe((data: any) => {
      this.visits = data.visitantes;
      this.user = data.usuarios; console.log(data)
    });
  }

}
