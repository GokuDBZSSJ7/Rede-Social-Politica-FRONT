import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { StateService } from '../../../../services/state.service';
import { CityService } from '../../../../services/city.service';
import { PartyService } from '../../../../services/party.service';
import { OfficeService } from '../../../../services/office.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parties-form',
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
  templateUrl: './parties-form.component.html',
  styleUrl: './parties-form.component.scss'
})
export class PartiesFormComponent {
  offices: any[] = []
  parties: any[] = []
  cities: any[] = []
  states: any[] = []
  selectedStateId: any;
  selectedCityId: any;
  form!: FormGroup;

  user: any;

  constructor(
    private officeService: OfficeService,
    private partyService: PartyService,
    private cityService: CityService,
    private stateService: StateService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.listAll();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      acronym: [null, [Validators.required]],
      founding_date: [null, [Validators.required]],
      founders: [null, [Validators.required]],
      description: [null, [Validators.required]],
      statute: [null, [Validators.required]],
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
  }

  createParty() {
    this.partyService.create(this.form.value).subscribe({
      next: (res) => {
        Swal.fire({
          icon: "success",
          title: "Partido cadastrado com sucesso",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}