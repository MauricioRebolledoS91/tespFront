import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { FeesDetail } from './FeesDetail.model';
import { nanoid } from 'nanoid'

@Injectable({
  providedIn: 'root',
})
export class CostCalculationService {
  private apiUrl = 'http://localhost:54705/CarAuction';
  constructor(private http: HttpClient) { }

  getContact(basePrice: number, vehicleType: string): Observable<FeesDetail> {
    const url = `${this.apiUrl}?basePrice=${basePrice}&vehicleType=${vehicleType}`
    return this.http.get<FeesDetail>(url);

  }

}