import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OfficeService } from '../../../services/office.service';
import { PartyService } from '../../../services/party.service';
import { CityService } from '../../../services/city.service';
import { StateService } from '../../../services/state.service';
import { CandidatesService } from '../../../services/candidates.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginator,
  ],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.scss'
})
export class CandidatesComponent implements OnInit{
  displayedColumns: string[] = ['name', 'age', 'party', 'electoral_number', 'position', 'city_uf', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  offices: any[] = []
  parties: any[] = []
  cities: any[] = []
  states: any[] = []
  selectedStateId: any;

  constructor(
    private candidateService: CandidatesService,
    private officeService: OfficeService,
    private partyService: PartyService,
    private cityService: CityService,
    private stateService: StateService
  ){}

  ngOnInit(): void {
    this.listAll();
    this.listCandidates();
  }

  listAll(){
    this.partyService.list().subscribe({
      next: (res) => {
        this.parties = res
      }
    })

    this.officeService.list().subscribe({
      next: (res) => {
        this.offices = res
      }
    });

    this.stateService.list().subscribe({
      next: (res) => {
        this.states = res
      }
    })
  }

  listCandidates() {
    this.partyService.filterApprovedCandidates().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log(res);
      }
    })
  }

  onStateChange(): void {
    if (this.selectedStateId) {
      this.cityService.getCitiesByStateId(this.selectedStateId).subscribe(data => {
        this.cities = data;
      });
    } else {
      this.cities = [];
    }
  }

  approveCandidate(item: any) {
    Swal.fire({
      title: "Aprovar o candidato?",
      text: "Deseja realmente aprovar o candidato?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1B4588",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, aprovar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.partyService.approveCandidate(item.id).subscribe({
          next: res => {
            this.listCandidates();
            console.log('Funcionou')
          }
        });
      }
    });
  }
  
}
