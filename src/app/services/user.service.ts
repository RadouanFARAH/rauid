import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  insertFeedback(data) {
    return this.http.post(this.Url + '/setFeedbacks', data)

  }
  getFeedbacks(data) {
    return this.http.post(this.Url + '/getFeedbacks', data)
  }

  name = new BehaviorSubject('')
  role = new BehaviorSubject('')
  Url = environment.url + "/user";
  constructor(private http: HttpClient) { }

  register(data) {
    return this.http.post(this.Url + '/register', data)
  }
  updateUser(data: any) {
    return this.http.post(this.Url + '/updateUser',data)
  }
  getGoal() {
    return this.http.get(this.Url + '/getGoalByuser')
  }
  setAppCost(data) {
    return this.http.post(this.Url + '/setAppCost', data);
  }
  setPercent(data) {
    return this.http.post(this.Url + '/setPercent', data);
  }
  setTimer(data) {
    return this.http.post(this.Url + '/setTimer', data);
  }
  setDelivery(data) {
    return this.http.post(this.Url + '/setDelivery', data);
  }
  setDeliveryParams(data) {
    return this.http.post(this.Url + '/setDeliveryParams', data);
  }
  getQuartierByUser(data) {
    return this.http.post(this.Url + '/getQuartierByUser',data)
  }

  login(data) {
    return this.http.post(this.Url + '/login', data)
  }
  getUsersByRole(role) {
    return this.http.post(this.Url + "/getUsersByRole", { role })
  }
}
