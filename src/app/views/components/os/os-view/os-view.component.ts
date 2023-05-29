import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-view',
  templateUrl: './os-view.component.html',
  styleUrls: ['./os-view.component.css']
})
export class OsViewComponent implements OnInit {

  os: OS = {
    prioridade: '',
    observacoes: '',
    status: '',
    tecnico: '',
    cliente: ''
  };

  constructor(private route: ActivatedRoute, private osService: OsService, private router: Router) {

  }
  
  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.osService.findById(this.os.id).subscribe(res => {
      this.os = res;
    })
  }

  voltar(): void {
    this.router.navigate(['os']);
  }
}
