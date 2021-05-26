import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskServiceService } from '../../task-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  sucess_msg = 'Added Sucessfully';
  constructor(private Task: TaskServiceService) {}

  addForm = new FormGroup({
    title: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl(''),
    task: new FormControl(''),
  });

  addNow() {
    this.Task.addTask(this.addForm.value).subscribe(
      (res) => {
        {
          console.log('Added Succeefully');
          document.getElementById('success_msg').style.display = 'block';
          setTimeout(function () {
            window.location.reload();
          }, 1100);
        }
      },
      (err) => {
        console.log('Error adding the task');
        this.sucess_msg = 'Unable to add Task';
      }
    );
  }

  ngOnInit(): void {}
}
