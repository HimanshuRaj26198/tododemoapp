import { Component, Input, OnInit } from '@angular/core';
import { TaskServiceService } from '../../task-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  constructor(private task: TaskServiceService) {}
  collection: any;
  id = this.task.selectedTask;
  sucess_msg = 'Updated Sucessfully';

  editForm = new FormGroup({
    title: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    task: new FormControl(''),
  });

  ngOnInit(): void {
    this.gettask();
  }

  gettask() {
    this.task.getOne(this.id).subscribe(
      (res: any) => {
        this.collection = res.task;
        console.log(this.collection);
      },
      (err) => console.log('Error', err)
    );
  }

  updateTask() {
    this.task.updatetask(this.id, this.editForm.value).subscribe(
      (res) => {
        document.getElementById('success_msg').style.display = 'block';
        setTimeout(() => {
          window.location.reload();
        }, 1100);
      },
      (err) => {
        console.log('Error');
        this.sucess_msg = 'Error Updating the task';
      }
    );
  }
}
