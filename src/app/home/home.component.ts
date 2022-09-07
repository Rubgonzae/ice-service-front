import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //Definicion de variables
  usuarios:any=[];
  _id = '';
  identificacion = '';
  Nombres = '';
  tipoId = '';
  apellidos = '';
  correo = '';
  usuario = '';
  contrasena = '';

  //Gestion de dependencias
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  //funcion de login
  login(){
    let url = `${environment.API_URL}usuarios/${this.identificacion}`;
    this.http.get<any>(url)
    .subscribe(data=>{
      this.usuarios=data;
      console.log('usuario : ', this.usuarios[0])
      //validar login
      this.validaLogin(data[0]);
    })
  }

  //validar login
  validaLogin(usr: any){
    if (usr)
    {
      if (this.contrasena === usr.contraseña &&
          this.usuario === usr.usuario)
          {
            alert('usuario valido')
            //cargar pagina de productos
            this.router.navigate(['/pruducts']);
          }
          else
          {
            alert('usuario o contraseña invalido');
            
          }
    }
    else
    {
      alert(`el usuario con identificación ${this.identificacion} no se encuentra registrado`)
      this.router.navigate(['/registro'])
    }    

  }

}
