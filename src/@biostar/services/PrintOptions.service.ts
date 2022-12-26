
import { Injectable } from '@angular/core';
import { PrintOptionsController } from '../APIs/PrintOptionsController';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PrintOptionsService {

constructor(
  private http : HttpService,
  //private http: HttpClient
) { }
getPrintOptions(model: any) {
  return this.http.GET(PrintOptionsController.PrintOptions, model);
  //this.http.get(PrintOptionsController.PrintOptions, model);
}
getActivePrintOptions(model: any) {
  
  return this.http.GET(PrintOptionsController.ActivePrintOptions, model);
}
getUserById(id: any) {
  return this.http.GET(`${PrintOptionsController.PrintOptions}/${id}`);
}
setPrintOptions(model: any) {
  // const headers = new HttpHeaders();
  // headers.append("Content-Type", "multipart/form-data");
  // console.log(headers);
  
  return this.http.POST(PrintOptionsController.PrintOptions, model);
}
updatePrintOptionsById(id: any,body) {
  return this.http.PUT(`${PrintOptionsController.PrintOptions}/${id}`,body);
}
deletePrintOptionsById(id: any) {
  return this.http.DELETE(`${PrintOptionsController.PrintOptions}/${id}`);
}
GetGroups() {
  return this.http.GET(PrintOptionsController.GetGroups);
}
GetGender() {
  return this.http.GET(PrintOptionsController.GetGender);
}
UpdateActive(id: any,IsActive:any) {
  //  IsActive = new HttpParams()
  return this.http.PUT(`${PrintOptionsController.UpdateActive}/${id}?IsActive=${IsActive}`,{});
}

}
