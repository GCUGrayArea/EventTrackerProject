import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generate, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Drink } from '../models/drink';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  private baseUrl: string = 'http://localhost:8088/api/tabs/';

  constructor( private http: HttpClient ) { }

  index(): Observable<Drink[]> {
    return this.http.get<Drink[]>( this.baseUrl )
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('RETRIEVAL FAILED' + err);
      })
    );
  }

  show( tid: number ) {
    return this.http.get<Drink[]>( this.baseUrl + tid )
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("TAB NOT FOUND")
      })
    )
  }

  create( drink: Drink, tabId ) {
    const httpOptions = {
      headers: {
        'Content-type' : 'application/json'
      }
    }

    return this.http.post<Drink>( this.baseUrl + tabId + '/drinks' , drink , httpOptions )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError("ERROR CREATING BAR TAB")
        })
    );
  }

  update( drink: Drink ) {
    const httpOptions = {
      headers: {
        'Content-type' : 'application/json'
      }
    }

    console.log(drink);

    return this.http.put<Drink>( this.baseUrl + drink.tab.id + '/drinks/' + drink.id , drink , httpOptions )
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("ERROR UPDATING TAB")
      })
    );
  }

  destroy( id: number ): Observable<boolean> {
    return this.http.delete<boolean>( 'http://localhost:8088/api/drinks/'+ id  ).pipe(
        catchError( ( err: any ) => {
          console.log( err );
          return throwError("DELETE FAILED")
        })
    );
  }

}
