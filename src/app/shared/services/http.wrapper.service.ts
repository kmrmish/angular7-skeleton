import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getApiHostName, getJsonPath } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HttpWrapperService {

    defaultOptions: any;
    hostName: string;
    jsonPath: string;

    constructor(
        private httpClient: HttpClient
    ) {
       this.hostName = getApiHostName();
       this.jsonPath = getJsonPath();
    }

    public post(endPoint, data: any): Observable<any> {
        return this.httpClient
        .post<any>(`${this.hostName}/${endPoint}`, data);
    }

    public put(endPoint, data: any): Observable<any> {
        return this.httpClient
        .put<any>(`${this.hostName}/${endPoint}/${data.id}`, data);
    }

    get(endPoint): Observable<any> {
        return this.httpClient
        .get<any>(`${this.hostName}/${endPoint}`);
    }

    getAll(endPoint): Observable<any[]> {
        return this.httpClient
        .get<any[]>(`${this.hostName}/${endPoint}`);
    }

    delete(endPoint, id: number) {
        return this.httpClient
        .delete(`${this.hostName}/${endPoint}/${id}`);
    }

    /* jsonUrl: ../../assets/SampleJson.json */
    public getJSON(jsonFileName): Observable<any> {
        return this.httpClient.get(`${this.jsonPath}/${jsonFileName}`);
    }

}
