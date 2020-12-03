import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generate, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Drink } from '../models/drink';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  private url: string = environment.baseUrl + 'api/tabs/';

  constructor( private http: HttpClient ) { }

  index(): Observable<Drink[]> {
    return this.http.get<Drink[]>( this.url )
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('RETRIEVAL FAILED' + err);
      })
    );
  }

  show( tid: number ) {
    return this.http.get<Drink[]>( this.url + tid )
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

    return this.http.post<Drink>( this.url + tabId + '/drinks' , drink , httpOptions )
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

    return this.http.put<Drink>( this.url + drink.tab.id + '/drinks/' + drink.id , drink , httpOptions )
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("ERROR UPDATING TAB")
      })
    );
  }

  destroy( id: number ): Observable<boolean> {
    return this.http.delete<boolean>( environment.baseUrl + 'api/drinks/'+ id  ).pipe(
        catchError( ( err: any ) => {
          console.log( err );
          return throwError("DELETE FAILED")
        })
    );
  }

}
