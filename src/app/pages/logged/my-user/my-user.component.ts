import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CandidatesService } from '../../../services/candidates.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { EditUserInfoTextModalComponent } from './edit-user-info-text-modal/edit-user-info-text-modal.component';
import { EditUserInfoListModalComponent } from './edit-user-info-list-modal/edit-user-info-list-modal.component';

@Component({
  selector: 'app-my-user',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './my-user.component.html',
  styleUrl: './my-user.component.scss'
})
export class MyUserComponent implements OnInit{
  user: any = this.authService.getUser();
  candidate: any
  
  constructor(
    private authService: AuthService,
    private candidateService: CandidatesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCandidate()
  }

  getCandidate() {
    this.candidateService.getCandidateByUserId(this.user.id).subscribe({
      next: (res) => {
        this.candidate = res
        console.log(res);
        
      }
    })
  }

  editUserModal(item: any) {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      data: item
    });

    console.log(item)
  }

  editUserInfoTextModal(item: any) {
    const dialogRef = this.dialog.open(EditUserInfoTextModalComponent, {
      data: item
    });

    console.log(item)
  }

  editUserInfoListModal(item: any) {
    const dialogRef = this.dialog.open(EditUserInfoListModalComponent, {
      data: item
    });

    console.log(item)
  }
}
