import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ListFoodService} from './list-food.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Food} from '../food.model';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css']
})
export class ListFoodComponent implements OnInit {
  displayedColumns: string[] = ['name', 'scientificName', 'mainGroup', 'subCategory', 'actions'];
  dataSource = new MatTableDataSource<Food>([]);
  length: number;
  pageNumber = 0;
  pageSize = 10;
  @ViewChild(MatPaginator, {static: false, read: true})  paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  pageEvent: PageEvent;
  constructor(private listFoodService: ListFoodService
  ) { }

  ngOnInit(): void {
    this.getFoods(this.pageNumber, this.pageSize);
  }

  getFoods(pageNumber: number, pageSize: number): void {
    this.listFoodService.getFoods(pageNumber, pageSize).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data.content);
        this.paginator = this.dataSource.paginator;
        this.dataSource.sort = this.sort;
        this.length = data.totalElements;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
      },
      (error: any) => {
        console.log('error occured during getFoods call ');
        console.log('message error : ', error.message);
      }
    );
  }

  deleteFood(id: number): void {

  }

  researchFood(name: string): void {
    this.listFoodService.searchFood(name, 0, this.pageSize).subscribe(
      data => {
        this.dataSource = data.content;
        this.paginator = this.dataSource.paginator;
        this.dataSource.sort = this.sort;
        this.length = data.totalElements;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
      },
      (error: any) => {
        console.log(error.error.message);
      }
    );
  }

  paginateTo(event?: PageEvent): PageEvent {
    this.getFoods(event.pageIndex, event.pageSize);
    return event;
  }

}
