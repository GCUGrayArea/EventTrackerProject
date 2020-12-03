import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { generate, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BarTab } from '../models/bar-tab';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class BarTabService {

  // private baseUrl: string = 'http://localhost:8088/';
  private url = environment.baseUrl + 'api/tabs/';

  constructor( private http: HttpClient ) { }

  index(): Observable<BarTab[]> {
    return this.http.get<BarTab[]>( this.url )
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('RETRIEVAL FAILED' + err);
      })
    );
  }

  show( tid: number ) {
    return this.http.get<BarTab>( this.url + tid )
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("TAB NOT FOUND")
      })
    )
  }

  create( tab: BarTab ) {
    const httpOptions = {
      headers: {
        'Content-type' : 'application/json'
      }
    }
    tab.drinks = [];

    return this.http.post<BarTab>( this.url , tab , httpOptions )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError("ERROR CREATING BAR TAB")
        })
      )
  }

  update( tab: BarTab ) {
    tab.drinks = [];
    tab.createdAt = tab.createdAt.split("T")[0] + "T" + tab.createdAt.split("T")[1];
    const httpOptions = {
      headers: {
        'Content-type' : 'application/json'
      }
    }

    console.log(tab);
  // var current: BarTab;
  // this.show( tab.id ).subscribe(
  //   (data) => {
  //     current = data;
  //   } ,
  //   (err) => {
  //     console.error('retrieval failed:');
  //     console.error(err);
  //   }
  // );
  // current.location = tab.location;
    return this.http.put<BarTab>( this.url + tab.id , tab , httpOptions )
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError("ERROR UPDATING TAB")
      })
    )
  }

  destroy( id: number ): Observable<boolean> {
    return this.http.delete<boolean>( this.url + id  ).pipe(
        catchError( ( err: any ) => {
          console.log( err );
          return throwError("DELETE FAILED")
        })
    );
  }

}
