import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Appointment} from "../interfaces/appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  // Endpoint
  basePath = 'http://localhost:8080/api/v1/appointments';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }

  // API Error Handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message} `);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  create(clientId:any,applianceModelId:any, technicianId: any,item: any): Observable<Appointment> {
    return this.http.post<Appointment>(`${ this.basePath }/${ clientId }/${technicianId}/${ applianceModelId }`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }


  getById(id: any): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByClientId(clientId: any):Observable<Appointment> {
    return this.http.get<Appointment>(`${this.basePath}/${clientId}/clients/appointments`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  getByTechnicianId(technicianId: any): Observable<any> {
    return this.http.get(`${this.basePath}/${technicianId}/technicians/appointments`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // Get All
  getAll(): Observable<Appointment> {
    return this.http.get<Appointment>(this.basePath, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Update
  update(id: any, item: any): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.basePath}/${id}`, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Delete
  delete(id: any) {
    return this.http.delete(`${this.basePath}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

}
