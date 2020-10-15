import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  nombre:string;

  constructor() { 
    this.nombre = 'nombre por defecto';
  }

  ngOnInit(): void {
  }

}
