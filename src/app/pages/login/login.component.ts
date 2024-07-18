import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
// import {MdInputDirective} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form!: FormGroup;
  hide = true;
  errorMsg: string = '';

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private auth: AuthGuard,
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
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this.spinner.show(); 
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.spinner.hide(); 
        // this.router.navigate(['/feed']);
      },
      error: (err) => {
        this.errorMsg = err.error.message;
        this.spinner.hide(); 
      },
    });
  }
}