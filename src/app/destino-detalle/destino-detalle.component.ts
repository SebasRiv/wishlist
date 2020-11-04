import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinoViaje } from '../models/destino-viaje.model';
import { DestinosApiClient } from '../models/destinos-api-client.model';

// class DestinosApiClientViejo {
//   getById(id: string): DestinoViaje {
//     console.log('Llamado por la clase vieja');
//     return null;
//   }
// }

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [DestinosApiClient]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  style = {
    sources: {
      world: {
        type: 'geojson',
        data: 'https://raw.githubsercontent.com/johan/world.geo.json/master/countries.geo.json'
      }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': {
        'fill-color': '#6F788A'
      }
    }]
  }

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
