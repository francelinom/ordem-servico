import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  id_tec = '';

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(
    private router: Router,
    private tecnicoService: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  update(): void {
    this.tecnicoService.update(this.tecnico).subscribe(res => {
      this.router.navigate(['/tecnicos']);
      this.tecnicoService.message('Tecnico atualizado com sucesso.');
    }, error => {
      if (error?.error?.erros?.length && error?.error?.erros[0].message === 'número do registro de contribuinte individual brasileiro (CPF) inválido') {
        this.tecnicoService.message('CPF Inválido');
      } else if (error.error.error === 'CPF já cadastrado na base de dados!') {
        this.tecnicoService.message(error.error.error);
      }
    });
  }

  findById(): void {
    this.tecnicoService.findById(this.id_tec).subscribe(res => {
      this.tecnico = res;
    });
  }

  cancel(): void {
    this.router.navigate(['/tecnicos']);
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
