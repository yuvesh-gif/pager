import { TodoModel } from "./todo.model";
 
export interface TodoPagingModel {
    data: TodoModel[],
    totalCount:number
}