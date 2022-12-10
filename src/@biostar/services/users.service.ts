import { Injectable } from '@angular/core';
import { UsersController } from '../APIs/usersController';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(
  private http: HttpClient
) { }
getUsers(model: any) {
  return this.http.get(UsersController.Users, model);
}
getUserById(id: any) {
  return this.http.get(`${UsersController.Users}/${id}`);
}
setUsers(model: any) {
  // const headers = new HttpHeaders();
  // headers.append("Content-Type", "multipart/form-data");
  // console.log(headers);
  
  return this.http.post(UsersController.Users, model);
}
updateUserById(id: any,body) {
  return this.http.put(`${UsersController.Users}/${id}`,body);
}
deleteUserById(id: any) {
  return this.http.delete(`${UsersController.Users}/${id}`);
}
GetGroups() {
  return this.http.get(UsersController.GetGroups);
}
GetGender() {
  return this.http.get(UsersController.GetGender);
}


}
