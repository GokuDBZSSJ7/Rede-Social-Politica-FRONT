import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../../../services/post.service';
import { AuthService } from '../../../../services/auth.service';
import { CandidatesService } from '../../../../services/candidates.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  form!: FormGroup;
  user: any = this.authService.getUser();
  candidate: any;
  imageUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPostComponent>,
    private postService: PostService,
    private authService: AuthService,
    private candidateService: CandidatesService
  ) { }

  ngOnInit() {
    this.initializeForm();
    this.getCandidate();
  }

  getCandidate() {
    this.candidateService.getCandidateByUserId(this.user.id).subscribe({
      next: (res) => {
        this.candidate = res;
        this.form.patchValue({ candidate_id: this.candidate.id });
      },
      error: (err) => {
        console.error('Erro ao obter candidato', err);
      }
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      user_id: [this.user.id],
      description: [null],
      candidate_id: [null],
      image_url: [null]
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  publishPost() {
    if (this.form.valid) {
      const formData = this.form.value;
  
      // Verifica se a imagem base64 está presente e adiciona o prefixo se necessário
      if (this.imageUrl) {
        const base64String = this.imageUrl as string;
        formData.image_url = base64String.split(',')[1]; // Remove o prefixo 'data:image/...;base64,'
      }
  
      this.postService.create(formData).subscribe({
        next: (res: any) => {
          this.dialogRef.close(res);
        },
        error: (err) => {
          console.error('Erro ao publicar post', err);
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const base64String = e.target.result as string;
          this.imageUrl = base64String;
          this.form.get('image_url')?.setValue(base64String);
        }
      };

      reader.readAsDataURL(file);
    }
  }
}