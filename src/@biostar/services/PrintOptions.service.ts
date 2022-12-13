
import { Injectable } from '@angular/core';
import { PrintOptionsController } from '../APIs/PrintOptionsController';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrintOptionsService {

constructor(
  private http: HttpClient
) { }
getPrintOptions(model: any) {
  return this.http.get(PrintOptionsController.PrintOptions, model);
}
getActivePrintOptions(model: any) {
  return this.http.get(PrintOptionsController.ActivePrintOptions, model);
}
getUserById(id: any) {
  return this.http.get(`${PrintOptionsController.PrintOptions}/${id}`);
}
setPrintOptions(model: any) {
  // const headers = new HttpHeaders();
  // headers.append("Content-Type", "multipart/form-data");
  // console.log(headers);
  
  return this.http.post(PrintOptionsController.PrintOptions, model);
}
updatePrintOptionsById(id: any,body) {
  return this.http.put(`${PrintOptionsController.PrintOptions}/${id}`,body);
}
deletePrintOptionsById(id: any) {
  return this.http.delete(`${PrintOptionsController.PrintOptions}/${id}`);
}
GetGroups() {
  return this.http.get(PrintOptionsController.GetGroups);
}
GetGender() {
  return this.http.get(PrintOptionsController.GetGender);
}


}
