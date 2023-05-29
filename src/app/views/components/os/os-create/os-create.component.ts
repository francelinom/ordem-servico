import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  selectedTecnico: any = '';
  selectedCliente: any = '';
  selectedStatus: any = '';
  selectedPrioridade: any = '';
  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  constructor(
    private tecnicoService: TecnicoService,
    private clienteService: ClienteService) {

  }

  ngOnInit(): void {
    this.listarTecnico();
    this.listarCliente();
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
