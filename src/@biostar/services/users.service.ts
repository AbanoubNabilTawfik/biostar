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
  return this.http.post(UsersController.Users, model);
}
updateUserById(id: any,body) {
  return this.http.put(`${UsersController.Users}/${id}`,body);
}
deleteUserById(id: any) {
  return this.http.delete(`${UsersController.Users}/${id}`);
}
}
