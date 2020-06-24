import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, find, filter, first } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';



@Injectable({ providedIn: 'root', })

export class MeetingService {


    constructor(private http: HttpClient) {

    }

    public GetGenerateToken(apiKey: string, apiSecret: string, meetingNumber: string, role: string): Observable<any> {
        return this.http.get<any>('http://localhost:58537/api/site/getgeneratetoken/' + apiKey + '/' + apiSecret + '/' + meetingNumber + '/' + role);
    }

}