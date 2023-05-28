import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    nome: '',
    cpf: '',
    telefone: ''
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(private router: Router, private tecnicoService: TecnicoService) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['/tecnicos']);
  }

  create(): void {
    this.tecnicoService.create(this.tecnico).subscribe(res => {
      this.router.navigate(['/tecnicos']);
      this.tecnicoService.message('Tecnico criado com sucesso!');
    }, error => {
      console.log(error)
      if (error.error.error !== 'CPF já cadastrado na base de dados!' && error?.error?.erros[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido') {
        this.tecnicoService.message('CPF Inválido');
      } else if (error.error.error === 'CPF já cadastrado na base de dados!') {
        this.tecnicoService.message(error.error.error);
      }
    })
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
