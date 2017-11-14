import { Injectable } from '@angular/core';
import { IUser } from '../user/user.model';

@Injectable()
export class AuthService {

  currentUser: IUser;
  registerCitizenForm(kad_pengenalan_my: string, nama_penuh: string) {

  }


  loginUser(userName: string, password: string) {
    this.currentUser = {
      id: 1,
      userName: userName,
      firstName: 'Sridhar',
      lastName: 'Swaminathan'
    };
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  constructor() { }

}
