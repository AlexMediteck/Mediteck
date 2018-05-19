import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;

  constructor(private router: Router) {
    this.formulario = new FormGroup({
      username: new FormControl('', Validators.required ),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    init_plugins();
  }

  login() {
    this.router.navigate(['/suscripcion']);
  }
}
