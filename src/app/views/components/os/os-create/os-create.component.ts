import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  os: OS = {
    prioridade: '',
    observacoes: '',
    status: '',
    tecnico: '',
    cliente: ''
  };

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService,
    private osService: OsService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.listarTecnico();
    this.listarCliente();
  }

  create(): void {
    this.osService.create(this.os).subscribe(res => {
      this.osService.message('Ordem de servico creada com sucesso.');
      this.router.navigate(['os']);
    });
  }

  listarTecnico(): void {
    this.tecnicoService.findAll().subscribe(res => {
      this.tecnicos = res;
    });
  }

  listarCliente(): void {
    this.clienteService.findAll().subscribe(res => {
      this.clientes = res;
    });
  }
}
