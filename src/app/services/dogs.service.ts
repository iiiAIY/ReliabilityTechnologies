import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDog, IFood} from "../models";

@Injectable()
export class DogsService {
  private url : string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  public getDogs(): Observable<IDog []> {
    return this.http.get<IDog []>(`${this.url}/dogs`)
  }

  public getDogsWithFilter(str : string): Observable<IDog []> {
    return this.http.get<IDog []>(`${this.url}/dogs?q=${str}`)
  }

  public getFoods() : Observable<IFood []> {
    return this.http.get<IFood []>(`${this.url}/foods`)
  }
}
