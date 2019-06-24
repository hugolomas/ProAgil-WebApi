import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

_filtroLista: string;

get filtroLista(): string {
  return this._filtroLista;
}
set filtroLista(value: string) {
  this._filtroLista = value;
  this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
}

eventosFiltrados: any = [];
eventos: any = [];
_UrlApi: any = 'http://localhost:5000/Api/values';
imgLargura = 50;
imgMargem = 2;
mostrarImg = false;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  changeImg(){
    this.mostrarImg = !this.mostrarImg;
  }

  filtrarEvento(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1);
  }

  getEventos(){
    this.http.get(this._UrlApi).subscribe(response => 
    {this.eventos = response;}, 
    error => 
    {console.log(error);}
    
    );
  }

}
