import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoPagingModel } from './models/todo.paging.model';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}
 
  getTodos(currentPage: number, pageSize: number): Observable<TodoPagingModel> {
    return this.httpClient.get<TodoPagingModel>(
      `https://localhost:6001/api/Todo?currentPageNumber=${currentPage}&pagesize=${pageSize}`
    );
  }
}