import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  constructor(private router: Router, private tecnicoService: TecnicoService) { }

  ngOnInit(): void {

  }

  cancel(): void {
    this.router.navigate(['/tecnicos']);
  }

  create(): void {
    const tecnico: Tecnico = {
      nome: 'Francelino',
      cpf: '629.106.940-70',
      telefone: '(84) 98181-2323'
    }

    this.tecnicoService.create(tecnico).subscribe(res => {
      this.router.navigate(['/tecnicos']);
      this.tecnicoService.message('Tecnico criado com sucesso!');
    }, error => {
      this.tecnicoService.message(error.error.error);
    })
  }

}
