import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';
import { ElegidoFavoritoAction, NuevoDestinoAction } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css'],
  providers: [DestinosApiClient]
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  destinos: DestinoViaje[];
  updates: string[];

  constructor(private destinosApiClient: DestinosApiClient, private store: Store<AppState> ) {
    this.destinos = [];
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.store.select(state => state.destinos.favorito)
      .subscribe(data => {
        const fav = data;
        if (fav != null) {
          this.updates.push('Se ha elegido a ' + fav.nombre);
        }
      });
  }

  ngOnInit(): void {
  }

  agregado(d: DestinoViaje) {
    this.destinos.push(d);
    this.onItemAdded.emit(d);
    this.store.dispatch(new NuevoDestinoAction(d));
  }

  // guardar(nombre:string, url:string):boolean {
  //   this.destinos.push(new DestinoViaje(nombre, url));
  //   console.log(this.destinos);
  //   return false;
  // }

  elegido(d: DestinoViaje) {
    // this.destinos.forEach(x => {
    //   x.setSelected(false);
    // });
    // d.setSelected(true);
    this.destinosApiClient.elegir(d);
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }

}
