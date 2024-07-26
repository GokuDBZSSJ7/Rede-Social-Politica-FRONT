import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { OfficeService } from '../../../../services/office.service';
import { PartyService } from '../../../../services/party.service';
import { CityService } from '../../../../services/city.service';
import { StateService } from '../../../../services/state.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-candidate-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatCheckboxModule
  ],
  templateUrl: './candidate-modal.component.html',
  styleUrl: './candidate-modal.component.scss'
})
export class CandidateModalComponent  implements OnInit{
  
  offices: any[] = []
  parties: any[] = []
  cities: any[] = []
  states: any[] = []
  selectedStateId: any;

  constructor(
    private officeService: OfficeService,
    private partyService: PartyService,
    private cityService: CityService,
    private stateService: StateService
  ){}

  ngOnInit(): void {
    this.listAll();
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

  onStateChange(): void {
    if (this.selectedStateId) {
      this.cityService.getCitiesByStateId(this.selectedStateId).subscribe(data => {
        this.cities = data;
      });
    } else {
      this.cities = [];
    }
  }
}
