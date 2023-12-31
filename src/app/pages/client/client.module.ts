import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class ClientModule { }
