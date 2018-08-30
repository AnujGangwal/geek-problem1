import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FindFalconeService {
  planetFound;
  timeTaken;
  constructor(private http:HttpClient) { }

  getPlanets(){
    return this.http.get('https://findfalcone.herokuapp.com/planets', {responseType: 'text'})
    .pipe(
      tap( // Log the result or error
        data => data,
        error => this.handleError(error)
      )
    );
  }

  getVehicle(){
    return this.http.get('https://findfalcone.herokuapp.com/vehicles', {responseType: 'text'})
    .pipe(
      tap( // Log the result or error
        data => data,
        error => this.handleError(error)
      )
    );
  }

  getToken(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json'
      })
    };
    return this.http.post('https://findfalcone.herokuapp.com/token', '', httpOptions)
    .pipe(
      tap( // Log the result or error
        data => data,
        error => this.handleError(error)
      )
    );
  }

  find(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('https://findfalcone.herokuapp.com/find',data, httpOptions)
    .pipe(
      tap( // Log the result or error
        data => data,
        error => this.handleError(error)
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
