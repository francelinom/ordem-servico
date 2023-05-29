import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    nome: '',
    cpf: '',
    telefone: ''
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(private router: Router, private clienteService: ClienteService) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(res => {
      this.router.navigate(['/clientes']);
      this.clienteService.message('Cliente criado com sucesso!');
    }, error => {
      if (error.error.error !== 'CPF já cadastrado na base de dados!' && error?.error?.erros[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido') {
        this.clienteService.message('CPF Inválido');
      } else if (error.error.error === 'CPF já cadastrado na base de dados!') {
        this.clienteService.message(error.error.error);
      }
    });
  }

  errorValidName() {
    if (this.nome.invalid) {
      return 'O nome deve ter entre 5 e 100 caracteres.';
    }
    return false;
  }

  errorValidCpf() {
    if (this.cpf.invalid) {
      return 'O CPF deve ter 14 caracteres.';
    }
    return false;
  }

  errorValidTelefone() {
    if (this.telefone.invalid) {
      return 'O telefone deve ter 15 caracteres.';
    }
    return false;
  }
}
