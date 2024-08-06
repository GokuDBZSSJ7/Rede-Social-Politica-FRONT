import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CandidatesService } from '../../../services/candidates.service';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(private authService: AuthService, private candidateService: CandidatesService) {}

  user: any = this.authService.getUser();
  candidate: any

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
}
