import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatPaginator,
  ],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'term_period'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private positionService: PositionService,
  ) { }

  ngOnInit() {
    this.listPositions();
  }

  listPositions() {
    this.positionService.list().subscribe({
      next: res => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        console.log(res);
      }
    })
  }
}
