import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  constructor(
    private http:HttpClient
  ) { }
  //definicion de variables
  usuarios:any=[];
  _id = '';
  modalTitle = "";
  identificacion = '';
  Nombres = '';
  tipoId = '';
  apellidos = '';
  correo = '';
  usuario = '';
  contrasena = '';

  //instrucciones que se ejecutan antes de cargar la pagina
  ngOnInit(): void {
    this.refreshList(); //ejecutar la consulta de usuarios
  }

  //consulta de usuarios
  refreshList(){
    this.http.get<any>(environment.API_URL+'usuarios')
    .subscribe(data=>{
      this.usuarios=data;
    })
  }

  //definir campos para insertar usuario
  addClick(){
    this.modalTitle = 'Agregar Usuarios';
    this._id = '';
    this.identificacion = '';
    this.Nombres = '';
    this.tipoId = '';
    this.apellidos = '';
    this.correo = '';
    this.usuario = '';
    this.contrasena = '';
  }

  //define campos para actualizar usuario
  editClick(usr:any){
    this.modalTitle = 'Editar Usuarios';
    this._id = usr._id;
    this.identificacion = usr.identificacion;
    this.tipoId = usr.tipoId;
    this.Nombres = usr.Nombres;
    this.apellidos = usr.apellidos;
    this.correo = usr.correo;
    this.usuario = usr.usuario;
    this.contrasena = usr.contraseña
  }

  //crear usuario
  createClick(){
    var val={
      identificacion : this.identificacion,
      tipoId : this.tipoId,
      Nombres : this.Nombres,
      apellidos: this.apellidos,
      correo : this.correo,
      usuario : this.usuario,
      contraseña : this.contrasena
    };
    this.http.post(environment.API_URL+'usuarios', val)
    .subscribe(res =>{
      alert(res.toString());
      this.refreshList();
    });

  };

  //edita el usuario
  updateClick(){
    var val={
      identificacion : this.identificacion,
      tipoId : this.tipoId,
      Nombres : this.Nombres,
      apellidos : this.apellidos,
      correo : this.correo,
      usuario : this.usuario,
      contraseña : this.contrasena
    };
    this.http.put(environment.API_URL+'usuarios', val)
    .subscribe(res =>{
      alert(res.toString());
      this.refreshList();
    });

  };

  //elimar usuario
  deleteClick(id: any){
    if(confirm('Esta seguro de eliminar el usuario?')){
        
      this.http.delete(environment.API_URL+'usuarios/'+id)
      .subscribe(res =>{
        alert(res.toString());
        this.refreshList();
      });
    }
  

  }

}
