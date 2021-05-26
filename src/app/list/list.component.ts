import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskServiceService } from '../task-service.service';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private dialog: MatDialog, private Task: TaskServiceService) {}
  collection: any = [];
  pageNo = 1;
  currentPage = 'all';
  sampleData = 'lkadjadkasjnsakj';
  sucess_msg = 'Deleted Sucessfully';

  ngOnInit(): void {
    this.getTask();
  }

  addTask() {
    this.dialog.open(AddTaskComponent, { backdropClass: 'backdropBackground' });
  }

  editTask(data) {
    this.Task.selectTask(data);
    this.dialog.open(EditTaskComponent, {
      backdropClass: 'backdropBackground',
    });
  }

  getTask() {
    this.Task.getAllTasks(this.pageNo).subscribe(
      (res: any) => {
        (this.collection = res.task), console.log(this.collection);
        this.currentPage = 'all';
        this.pageNo = 1;
      },
      (err) => console.log('Error')
    );
  }

  completeIt(data) {
    console.log('alhdalj');
    this.Task.completeIt({ id: data }).subscribe(
      (res) => {
        console.log('marked as completed successfully');
        if (this.currentPage === 'all') {
          this.getTask();
        } else if (this.currentPage === 'Pending') {
          this.getPending();
        }
      },
      (err) => console.log('Error Marking as completed')
    );
  }

  deleteTask(data) {
    this.Task.deleteTask({ id: data }).subscribe(
      (res) => {
        console.log('Deleted Successfully');
        if (this.currentPage === 'all') {
          this.getTask();
        } else if (this.currentPage === 'Pending') {
          this.getPending();
        } else if (this.currentPage === 'Completed') {
          this.getCompleted();
        }

        document.getElementById('success_msg').style.display = 'block';
        setTimeout(() => {
          document.getElementById('success_msg').style.display = 'none';
        }, 1200);
      },
      (err) => console.log('Error deleting')
    );
  }

  getPending() {
    this.Task.getPending(this.pageNo).subscribe(
      (res: any) => {
        this.collection = res.task;
        console.log(res);
        this.currentPage = 'Pending';
        this.pageNo = 1;

        console.log(this.currentPage);
      },
      (err) => console.log('Error fetching the data')
    );
  }

  getCompleted() {
    this.Task.getCompleted(this.pageNo).subscribe(
      (res: any) => {
        this.collection = res.task;
        this.currentPage = 'Completed';
        console.log(this.currentPage);
        this.pageNo = 1;
      },
      (err) => console.log('Error Fetching')
    );
  }

  nextPage() {
    if (this.collection.length === 4) {
      this.pageNo += 1;
    }
    if (this.currentPage === 'all') {
      this.getTask();
    } else if (this.currentPage === 'Pending') {
      this.getPending();
    } else if (this.currentPage === 'Completed') {
      this.getCompleted();
    }
  }

  prevPage() {
    if (this.pageNo != 1) {
      this.pageNo -= 1;
    }
    if (this.currentPage === 'all') {
      this.getTask();
    } else if (this.currentPage === 'Pending') {
      this.getPending();
    } else if (this.currentPage === 'Completed') {
      this.getCompleted();
    }
  }
}
