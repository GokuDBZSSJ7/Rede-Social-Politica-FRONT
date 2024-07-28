import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { OfficeService } from '../../../../services/office.service';
import { PartyService } from '../../../../services/party.service';
import { CityService } from '../../../../services/city.service';
import { StateService } from '../../../../services/state.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../../../services/auth.service';
import { CandidatesService } from '../../../../services/candidates.service';

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
export class CandidateModalComponent implements OnInit {

  offices: any[] = []
  parties: any[] = []
  cities: any[] = []
  states: any[] = []
  selectedStateId: any;
  selectedCityId: any;
  selectedPartyId: any;
  selectedOfficeId: any;
  form!: FormGroup;

  user: any;

  constructor(
    private officeService: OfficeService,
    private partyService: PartyService,
    private cityService: CityService,
    private stateService: StateService,
    private authService: AuthService,
    private fb: FormBuilder,
    private candidateService: CandidatesService
  ) { }

  ngOnInit(): void {
    this.listAll();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      age: [null, [Validators.required]],
      email: [null, [Validators.required]],
      education: [null, [Validators.required]],
      experience: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      office_id: [null, [Validators.required]],
      party_id: [null, [Validators.required]],
      city_id: [this.selectedCityId, [Validators.required]],
      state_id: [this.selectedStateId, [Validators.required]],
    });
  }

  listAll() {
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

    this.user = this.authService.getUser()
  }

  onStateChange(): void {
    if (this.selectedStateId) {
      this.cityService.getCitiesByStateId(this.selectedStateId).subscribe(data => {
        this.cities = data;
        this.form.get('state_id')?.setValue(this.selectedStateId);
      });
    } else {
      this.cities = [];
    }
  }

  onCityChange(): void {
    this.form.get('city_id')?.setValue(this.selectedCityId);
    console.log(this.selectedCityId);

  }

  onOfficeChange(): void {
    this.form.get('party_id')?.setValue(this.selectedPartyId);
  }

  onPartyChange(): void {
    this.form.get('office_id')?.setValue(this.selectedPartyId);
  }

  save() {
    this.candidateService.create(this.form.value).subscribe({

    })
  }
}