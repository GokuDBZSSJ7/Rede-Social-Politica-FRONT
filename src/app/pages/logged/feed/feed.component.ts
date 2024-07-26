import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit{
  constructor(private postService: PostService){}
  posts: any[] = []

  ngOnInit() {
    this.listPosts();
  }

  listPosts() {
    this.postService.all().subscribe({
      next: (res) => {
        console.log(res);
        
        this.posts = res
      }
    })
  }
}
