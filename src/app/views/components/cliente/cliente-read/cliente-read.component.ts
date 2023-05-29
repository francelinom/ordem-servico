import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements AfterViewInit, OnInit {

  clientes: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Cliente>(this.clientes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit() { }

  findAll(): void {
    this.clienteService.findAll().subscribe(clientes => {
      this.clientes = clientes;
      this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/clientes/create']);
  }
}
