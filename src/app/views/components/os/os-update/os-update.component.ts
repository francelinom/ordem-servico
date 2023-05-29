import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
    this.listarTecnico();
    this.listarCliente();
  }

  findById(): void {
    this.osService.findById(this.os.id).subscribe(res => {
      this.os = res;
      this.converteDados();
    });
  }

  update(): void {
    this.osService.update(this.os).subscribe(res => {
      this.osService.message('Ordem de servico atualiza com sucesso.');
      this.router.navigate(['os']);
    });
  }

  cancel(): void {
    this.router.navigate(['os']);
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

  converteDados(): void {
    if (this.os.status == 'ABERTO') {
      this.os.status = 0;
    } else if (this.os.status == 'ANDAMENTO') {
      this.os.status = 1;
    } else {
      this.os.status = 2;
    }

    if (this.os.prioridade == 'BAIXA') {
      this.os.prioridade = 0;
    } else if (this.os.prioridade == 'MEDIA') {
      this.os.prioridade = 1;
    } else {
      this.os.prioridade = 2;
    }
  }
}
