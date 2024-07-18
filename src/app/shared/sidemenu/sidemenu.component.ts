import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatDividerModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {
  

  constructor(
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Usuário deslogado com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao realizar logout:', error);
      },
    });
  }

  

}
