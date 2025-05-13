import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/ApiService'; 
import { Country } from './country.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'sigla', 'gentilico', 'acoes'];
  dataSource: MatTableDataSource<Country>;

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  isAdmin: boolean = false;
  newCountry: Country = { id: 0, nome: '', sigla: '', gentilico: '' };
  editingCountry: Country | null = null;

  constructor(private apiService: ApiService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.checkAdmin();
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.apiService.getCountries().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Erro ao carregar os dados:', error);
      }
    );
  }

  editCountry(country: Country): void {
    this.editingCountry = { ...country };
  }

  saveCountry(): void {
    if (this.editingCountry) {
      this.apiService.saveCountry(this.editingCountry).subscribe(
        (updatedCountry) => {
          const index = this.dataSource.data.findIndex(c => c.id === updatedCountry.id);
          if (index !== -1) {
            this.dataSource.data[index] = updatedCountry;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editingCountry = null;
        },
        (error) => {
          console.error('Erro ao atualizar o país:', error);
        }
      );
    }
  }

  addCountry(): void {
    this.apiService.saveCountry(this.newCountry).subscribe(
      (newCountry) => {
        this.dataSource.data = [...this.dataSource.data, newCountry];
        this.newCountry = { id: 0, nome: '', sigla: '', gentilico: '' };
      },
      (error) => {
        console.error('Erro ao adicionar o país:', error);
      }
    );
  }

  deleteCountry(country: Country): void {
    this.apiService.deleteCountry(country).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(c => c.id !== country.id);
      },
      (error) => {
        console.error('Erro ao excluir o país:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingCountry = null;
  }

  checkAdmin(){
    const admin = localStorage.getItem('admin') === 'true'
    this.isAdmin = admin;
  }
}