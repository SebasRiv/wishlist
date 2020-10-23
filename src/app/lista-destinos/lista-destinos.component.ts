import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  destinos: DestinoViaje[];
  constructor() { 
    this.destinos = [];
    this.onItemAdded = new EventEmitter();
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {
    this.destinos.push(d);
    this.onItemAdded.emit(d);
  }

  // guardar(nombre:string, url:string):boolean {
  //   this.destinos.push(new DestinoViaje(nombre, url));
  //   console.log(this.destinos);
  //   return false;
  // }
 
  elegido(d: DestinoViaje) {
    this.destinos.forEach(x => {
      x.setSelected(false);
    });
    d.setSelected(true);
  }

}
