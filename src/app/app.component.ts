import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { switchMap, map } from 'rxjs/operators';
import { AppService } from './app.service';
import { TodoModel } from './models/todo.model';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  title = 'ang12-paging';
  columnsToDisplay = ['id', 'itemName', 'isCompleted'];
  totalRecords = 0;
  todos:TodoModel[] = [];
 
  @ViewChild(MatPaginator) paginator?:MatPaginator;
 
  constructor(private appService:AppService){}
 
  ngAfterViewInit(): void {
    this.pageChange();
    this.initialLoad();
  }
 
  initialLoad(){
    let currentPage = (this.paginator?.pageIndex ?? 0)+1;
    this.appService.getTodos(currentPage,  (this.paginator?.pageSize ?? 0))
    .subscribe(result => {
      this.totalRecords = result.totalCount;
      this.todos = result.data;
    })
  }
 
  pageChange(){
    this.paginator?.page.pipe(
      switchMap(() => {
        let currentPage = (this.paginator?.pageIndex ?? 0)+1;
        return this.appService.getTodos(currentPage, (this.paginator?.pageSize ?? 0));
      }),
      map( result => {
        if(!result){
          return [];
        }
        this.totalRecords = result.totalCount;
        return result.data;
      })
    )
    .subscribe(data => {
      this.todos = data;
    });
  }
}