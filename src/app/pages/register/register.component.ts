import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form!: FormGroup;
  hide = true;
  errorMsg: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleHide() {
    this.hide = !this.hide;
  }

  ngOnInit(){
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.min(3)]],
    });
  }

  register() {
    this.spinner.show(); 
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.spinner.hide(); 
        Swal.fire({
          icon: "success",
          title: "Registro feito com sucesso",
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/login']);
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Falha ao tentar registrar",
          showConfirmButton: false,
          timer: 1500
        })
        this.errorMsg = err.error.message;
        this.spinner.hide(); 
      },
    });
  }
}
