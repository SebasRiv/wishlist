import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos-detalles-component',
  templateUrl: './vuelos-detalles-component.component.html',
  styleUrls: ['./vuelos-detalles-component.component.css']
})
export class VuelosDetallesComponentComponent implements OnInit {
  id: any;

  constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
  }

}
