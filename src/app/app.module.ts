import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosViajesState, reducerDestinosViajes, intializeDestinoViajeState, DestinosViajesActionTypes, DestinoViajesEffects, InitMyDataAction } from './models/destinos-viajes-state.model';
import { ActionReducerMap, Store, StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';
import Dexie from 'dexie';

import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { VuelosComponentComponent } from './vuelos-component/vuelos-component.component';
import { VuelosMainComponentComponent } from './vuelos-main-component/vuelos-main-component.component';
import { VuelosMasInfoComponentComponent } from './vuelos-mas-info-component/vuelos-mas-info-component.component';
import { VuelosDetallesComponentComponent } from './vuelos-detalles-component/vuelos-detalles-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { AuthService } from './services/auth.service';
import { DestinoViaje } from './models/destino-viaje.model';

// app config
export interface AppConfig {
  apiEndPoint: String;
};

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'http://localhost:3000'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
// fin app config

// init routing
export const childrenRoutesVuelos: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: VuelosMainComponentComponent },
  { path: 'mas-info', component: VuelosMasInfoComponentComponent },
  { path: ':id', component: VuelosDetallesComponentComponent },
];

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinosComponent },
  { path: 'destino', component: DestinoDetalleComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [UsuarioLogueadoGuard]
  },
  {
    path: 'vuelos',
    component: VuelosComponentComponent,
    canActivate: [UsuarioLogueadoGuard],
    children: childrenRoutesVuelos
  }
];
// fin rounting

// app init
export function init_app(appLoadService: AppLoadService): () => Promise<any> {
  return () => appLoadService.initializeDestinosViajesState();
}

@Injectable()
class AppLoadService {
  constructor(private store: Store<AppState>, private http: HttpClient) {}
  async initializeDestinosViajesState(): Promise<any> {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('GET', APP_CONFIG_VALUE.apiEndPoint + '/my', { headers: headers });
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}
// fin app init

// redux init
export interface AppState {
  destinos: DestinosViajesState;
}

const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};

let reducerInitialState = {
  destinos: intializeDestinoViajeState()
}
// redux fin init


// dixie db
@Injectable({
  providedIn: 'root'
})
export class MyDataBase extends Dexie {
  destinos: Dexie.Table<DestinoViaje, number>;
  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl',
    });
  } 
}

export const db = new MyDataBase();
// fin dexie db


@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    LoginComponent,
    ProtectedComponent,
    VuelosComponentComponent,
    VuelosMainComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, { initialState: reducerInitialState }),
    EffectsModule.forRoot([DestinoViajesEffects]),
    StoreDevtoolsModule.instrument(),
    ReservasModule

  ],
  providers: [
    AuthService, UsuarioLogueadoGuard,
    { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    AppLoadService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [AppLoadService], multi: true },
    MyDataBase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
