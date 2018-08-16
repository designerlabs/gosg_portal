import { Injectable } from '@angular/core';

@Injectable()
export class StatisticService {
  allUser: any;
  newUser: any;

  constructor() { }
  getAllUserData() {
      return this.allUser;
  }
  getNewUserData() {
      return this.newUser;
  }

}
