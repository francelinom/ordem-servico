import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  id_tec = '';

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  };

  constructor(
    private router: Router,
    private tecnicoService: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.tecnicoService.findById(this.id_tec).subscribe(res => {
      this.tecnico = res;
    });
  }

  cancel(): void {
    this.router.navigate(['/tecnicos']);
  }

  delete(): void {
    this.tecnicoService.delete(this.id_tec).subscribe(res => {
      this.router.navigate(['/tecnicos']);
      this.tecnicoService.message('Tecnico deletado com sucesso.');
    }, error => {
      this.tecnicoService.message(error.error.error);
    });
  }

}