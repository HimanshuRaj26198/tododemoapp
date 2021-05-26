import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskServiceService {
  constructor(private http: HttpClient) {}
  selectedTask = '';
  rootUrl = 'http://localhost:3000/tasks';

  getAllTasks(page) {
    return this.http.get(`${this.rootUrl}?page=${page}`);
  }

  addTask(data) {
    return this.http.post(`${this.rootUrl}/add`, data);
  }

  selectTask(data) {
    return (this.selectedTask = data);
  }

  completeIt(data) {
    console.log('akjbdkja');
    return this.http.post(`${this.rootUrl}/completeit`, data);
  }

  deleteTask(id) {
    return this.http.post(`${this.rootUrl}/delete`, id);
  }

  getPending(page) {
    return this.http.get(`${this.rootUrl}/pending?page=${page}`);
  }

  getCompleted(page) {
    return this.http.get(`${this.rootUrl}/completed?page=${page}`);
  }

  getOne(id) {
    console.log('From service jdajdjanlj');
    return this.http.get(`${this.rootUrl}/single/${id}`);
  }

  updatetask(id, data) {
    return this.http.put(`${this.rootUrl}/update/${id}`, data);
  }
}
