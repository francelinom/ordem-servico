import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements AfterViewInit, OnInit {

  os: OS[] = [];

  displayedColumns: string[] = ['tecnico', 'cliente', 'abertura', 'fechamento', 'prioridade', 'status', 'action'];
  dataSource = new MatTableDataSource<OS>(this.os);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private osService: OsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit() { }

  findAll(): void {
    this.osService.findAll().subscribe(os => {
      console.log(os)
      this.os = os;
      this.dataSource = new MatTableDataSource<OS>(this.os);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/os/create']);
  }
}