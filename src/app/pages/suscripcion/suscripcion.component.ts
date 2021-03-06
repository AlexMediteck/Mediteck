import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CentroMedicoService} from '../../services/centro-medico/centro-medico.service';
import {Suscripcion} from '../../interfaces/suscripcion.interface';
import {SuscripcionesService} from '../../services/suscripciones/suscripciones.service';
import {HttpErrorResponse} from '@angular/common/http';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-suscripcion',
  templateUrl: './suscripcion.component.html',
  styleUrls: ['./suscripcion.component.css']
})
export class SuscripcionComponent implements OnInit {

  formCentroMedico: FormGroup;
  formSuscripcion: FormGroup;
  idCentroMedico: number;
  suscripcion: any;
  isCorrect = false;

  tipo_centro_medico = [
    {value: 'CONSULTORIO', viewValue: 'CONSULTORIO'},
    {value: 'CLINICA', viewValue: 'CLINICA'},
    {value: 'HOSPITAL', viewValue: 'HOSPITAL'}
  ]

  tipo_suscripcion = [
    {value: 19, viewValue: 'CONSULTORIO'},
    {value: 20, viewValue: 'CLINICA'},
    {value: 21, viewValue: 'HOSPITAL BASICO'},
    {value: 21, viewValue: 'HOSPITAL PREMIUM'}
  ]

  constructor(private _centroMedicoService: CentroMedicoService,
              private _suscripcionesService: SuscripcionesService) {
    this.crearFormaCentroMedico();
    this.crearFormaSuscripcion();
  }

  ngOnInit() {
  }

  crearFormaCentroMedico() {
    this.formCentroMedico = new FormGroup({
      'Nombre': new FormControl('', []),
      'Direccion': new FormControl('', []),
      'Tipo_centro_medico': new FormControl('', [])
    });
  }

  crearFormaSuscripcion() {
    this.formSuscripcion = new FormGroup({
      'Nombre': new FormControl('', []),
      'Direccion': new FormControl('', []),
      'Tipo_centro_medico': new FormControl('', []),
      'Nombre_persona': new FormControl('', []),
      'Apellidos_persona': new FormControl('', []),
      'Fecha_inscripcion': new FormControl('', []),
      'Cedula': new FormControl('', []),
      'email': new FormControl('', []),
      'Password': new FormControl('', []),
      'Tipo_suscripcion': new FormControl(0, [])
    });
  }


  agregarCentroMedico() {
    console.log(this.formCentroMedico.value);
    this._centroMedicoService.postCentroMedico(this.formCentroMedico.value)
      .subscribe((res: any) => {
        this.idCentroMedico = res.data.id;
        console.log(res);
        this.isCorrect = !this.isCorrect;
      },
        (error: HttpErrorResponse) => {
          if (error.status !== 201) {
            swal('Error al dar de alta', 'Algo ha salido mal', 'error');
          }
        });
    console.log(this.formCentroMedico.value);
  }

  agregarSuscripcion() {
    this.suscripcion = this.formSuscripcion.value;
    this.suscripcion.Tipo_suscripcion = Number(this.suscripcion.Tipo_suscripcion);
    this.suscripcion.idCentro_medico = this.idCentroMedico;
    console.log(this.suscripcion);
    this._suscripcionesService.postSuscripcion(this.suscripcion)
      .subscribe((res: any) => {
          console.log(res);
          this.formCentroMedico.reset();
          this.formSuscripcion.reset();
          swal('Suscripcion agregada', 'Suscripcion agregada con exito', 'success');
          this.formSuscripcion.reset();
      },
        (error: HttpErrorResponse) => {
          if (error.status !== 201) {
            swal('Error al dar de alta', 'Algo ha salido mal', 'error');
          }
      });
  }
}
