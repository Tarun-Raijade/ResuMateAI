import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {

  constructor(private _http: HttpClient) { }

  private serverURL = 'http://localhost:8000';
  //private serverURL = 'http://192.168.1.8:8000';
  //private serverURL = 'http://192.168.10.56:8080'

  private selectedFileSource = new BehaviorSubject<File | null>(null);
  selectedFile$ = this.selectedFileSource.asObservable();

  setSelectedFile(file: File | null): void {
    this.selectedFileSource.next(file);
  }

  /**
   * Function to send PDF 
   * @param pdf - PDF file
   * @returns Observable<any>
   */
  sendData(data: any): Observable<any> {
    const url = `${this.serverURL}/upload`;
    return this._http.post(url, data);
  }

  /**
   * Function to send a question 
   * @param question - Question data
   * @returns Observable<any>
   */
  sendQuestion(question: any): Observable<any> {
    const url = `${this.serverURL}/resume_chat`;
    return this._http.post(url, question);
  }
}
