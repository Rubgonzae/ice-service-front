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
  usuarios:any=[];
  _id = '';
  identificacion = '';
  Nombres = '';
  tipoId = '';
  apellidos = '';
  correo = '';
  usuario = '';
  contrasena = '';

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }

  login(){
    let url = `${environment.API_URL}usuarios/${this.identificacion}`;
    console.log('url : ', url);
    this.http.get<any>(url)
    .subscribe(data=>{
      this.usuarios=data;
      console.log('usuario : ', this.usuarios[0])
      this.validaLogin(data[0]);
    })
  }

  validaLogin(usr: any){
    if (usr)
    {
      if (this.contrasena === usr.contraseña &&
          this.usuario === usr.usuario)
          {
            alert('usuario valido')
          }
          else
          {
            alert('usuario o contraseña invalido');
            
          }
    }
    else
    {
      alert(`el usuario con identificacion ${this.identificacion} no se encuentra registrado`)
      this.router.navigate(['/registro'])
    }    

  }

}
