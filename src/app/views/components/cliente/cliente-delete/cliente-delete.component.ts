import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  id_tec = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  };

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.clienteService.findById(this.id_tec).subscribe(res => {
      this.cliente = res;
    });
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }

  delete(): void {
    this.clienteService.delete(this.id_tec).subscribe(res => {
      this.router.navigate(['/clientes']);
      this.clienteService.message('Cliente deletado com sucesso.');
    }, error => {
      this.clienteService.message(error.error.error);
    });
  }

}