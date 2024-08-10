import { Component, OnInit, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PostService } from '../../../services/post.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
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
import { AddPostComponent } from './add-post/add-post.component';
import { AuthService } from '../../../services/auth.service';
import { CandidatesService } from '../../../services/candidates.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  posts: any[] = []
  candidate: any;
  user = this.authService.getUser()

  constructor(
    private postService: PostService,
    public dialog: MatDialog,
    private authService: AuthService,
    private candidateService: CandidatesService
  ) { }

  ngOnInit() {
    this.getCandidate();
    this.listPosts();
  }

  addLike(id: number) {
    this.postService.addLike(id).subscribe({
      next: (res) => {
        this.listPosts()

      }
    });
  }

  getCandidate() {
    this.candidateService.getCandidateByUserId(this.user.id).subscribe({
      next: (res) => {
        this.candidate = res

      }
    })
  }

  listPosts() {
    this.postService.all().subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res;
      }
    })
  }

  openAddPostModal() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '520px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.posts = result;
        this.listPosts();
      }
    });
  }
}