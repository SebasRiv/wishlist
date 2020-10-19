import { Component, OnInit, Input } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {

  @Input() destino:DestinoViaje;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
