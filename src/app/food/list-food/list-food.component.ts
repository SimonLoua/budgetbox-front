import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FoodService} from '../service/food.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Food} from '../food.model';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  constructor(private foodService: FoodService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFoods(this.pageNumber, this.pageSize);
  }

  getFoods(pageNumber: number, pageSize: number): void {
    this.foodService.getFoods(pageNumber, pageSize).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data.content);
        this.paginator = this.dataSource.paginator;
        this.dataSource.sort = this.sort;
        this.length = data.totalElements;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
      },
      (error: any) => {
        console.log('error occured during getFoods call');
        console.log('error : ', error);
      }
    );
  }

  deleteFood(id: number): void {
    this.foodService.delete(id).subscribe(
      result => {
        if (result) {
          this.openSnackBar('Suppression effectuée', 'Fermer');
          this.getFoods(this.pageNumber, this.pageSize);
        } else {
          this.openSnackBar('Suppression échouée', 'Fermer');
        }
      },
      (error: any) => {
        this.openSnackBar('Suppression échouée', 'Fermer');
        console.log('error occured during deleteFood call');
        console.log('error : ', error);
      }
    );
  }

  researchFood(name: string): void {
    this.foodService.searchFood(name, 0, this.pageSize).subscribe(
      data => {
        this.dataSource = data.content;
        this.paginator = this.dataSource.paginator;
        this.dataSource.sort = this.sort;
        this.length = data.totalElements;
        this.pageNumber = data.pageable.pageNumber;
        this.pageSize = data.pageable.pageSize;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  paginateTo(event?: PageEvent): PageEvent {
    this.getFoods(event.pageIndex, event.pageSize);
    return event;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

}
