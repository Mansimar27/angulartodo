import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AppService {

    constructor(private http: HttpClient) { }
    private apiUrl = 'https://mansimartodo-fdf9b8cead63.herokuapp.com/';

    getToDo(id: any): Observable<any> {
        return this.http.get<any>(this.apiUrl + "getToDo/" + id);
    }

    getAllToDo(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "getAllToDo");
    }

    getDeletedToDo(): Observable<any> {
        return this.http.get<any>(this.apiUrl + "getDeletedToDo");
    }

    createToDo(task: any, priority: any, status: any, dueDate: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + "createToDo", { task, priority, status, dueDate });
    }

    updateToDo(id: any, task: any, priority: any, status: any, dueDate: any): Observable<any> {
        return this.http.put<any>(this.apiUrl + "updateToDo/" + id, { task, priority, status, dueDate });
    }

    deleteToDo(id: any): Observable<any> {
        return this.http.delete<any>(this.apiUrl + "deleteToDo/" + id);
    }
}
