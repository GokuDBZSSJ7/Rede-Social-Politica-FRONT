import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { PositionService } from '../../../../services/position.service';

@Component({
  selector: 'app-positions-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './positions-form.component.html',
  styleUrl: './positions-form.component.scss'
})
export class PositionsFormComponent implements OnInit {
  form!: FormGroup
  constructor(
    private fb: FormBuilder,
    private positionService: PositionService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      term_period: [null, Validators.required],
      description: [null, Validators.required],
      jurisdiction: [null, Validators.required],
      requirements: [null, Validators.required],
    });
  }
  
  createPosition() {
    this.positionService.create(this.form.value).subscribe({
      next: (res) => {
        Swal.fire({
          icon: "success",
          title: "Cargo cadastrado com sucesso",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
