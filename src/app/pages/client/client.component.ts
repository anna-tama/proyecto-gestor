import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-clients',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  profileForm: FormGroup | undefined;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.initProfileForm();
  }

 initProfileForm(){
  this.profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl('')
  })
 }

  async onSubmit(){
    console.log(this.profileForm!.value)
    const response = await this.clientService.addClient(this.profileForm!.value);
    console.log('response',response)
  }

}
