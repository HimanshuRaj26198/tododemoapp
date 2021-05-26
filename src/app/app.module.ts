import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AddTaskComponent } from './list/add-task/add-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './list/edit-task/edit-task.component';

@NgModule({
  declarations: [AppComponent, ListComponent, AddTaskComponent, EditTaskComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents: [AddTaskComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
