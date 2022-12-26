import { Injectable } from '@angular/core';
import { UsersController } from '../APIs/usersController';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(
  private http: HttpService
  //private http: HttpClient
) { }
getUsers(fromid: any , toid :any) {
  return this.http.GET(`${UsersController.Users}?fromid=${fromid}&toid=${toid}`);
}
getUserById(id: any) {
  return this.http.GET(`${UsersController.Users}/${id}`);
}
setUsers(model: any) {
  // const headers = new HttpHeaders();
  // headers.append("Content-Type", "multipart/form-data");
  // console.log(headers);
  
  return this.http.POST(UsersController.Users, model);
}
updateUserById(id: any,body) {
  return this.http.PUT(`${UsersController.Users}/${id}`,body);
}
deleteUserById(id: any) {
  return this.http.DELETE(`${UsersController.Users}/${id}`);
}
GetGroups() {
  return this.http.GET(UsersController.GetGroups);
}
GetGender() {
  return this.http.GET(UsersController.GetGender);
}


}
