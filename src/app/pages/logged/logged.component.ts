import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, shareReplay } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidemenuComponent } from '../../shared/sidemenu/sidemenu.component';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-logged',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, SidemenuComponent, NgxSpinnerModule, AsyncPipe],
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.scss'
})
export class LoggedComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
}
