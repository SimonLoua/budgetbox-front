import {Component, OnInit, ViewChild} from '@angular/core';
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
  page = 0  ;
  size = 10;
  @ViewChild(MatPaginator, {static: false, read: true})  paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  pageEvent: PageEvent;
  constructor(private listFoodService: ListFoodService) { }

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods(): void {
    this.listFoodService.getFoods().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        console.log('data : ', data);
        console.log('data name : ', data[0].name);
        this.paginator = this.dataSource.paginator;
        this.dataSource.sort = this.sort;
        this.length = data.size;
        this.page = 1;
        this.size = this.size;
      },
      (error: any) => {
        console.log('error occured during getFoods call ');
        console.log('message error : ', error.message);
      }
    );
  };

  deleteFood(id: number): void {

  }

  researchFood(name: string): void {

  }

  paginateTo(event?: PageEvent): PageEvent {
    this.getFoods();
    return event;
  }

}
