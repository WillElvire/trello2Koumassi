import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativestorageService } from 'src/app/services/storage/nativestorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private storage:NativestorageService,private router:Router) { }

  ngOnInit() {
    this.storage.GetItem('alreadyLaunch').then((value)=>{
      if(value == null){
        this.setLoaded();
      }else{
        this.router.navigate(['/task']);
      }
    })
  }

  setLoaded(){
    this.storage.StoreItem('alreadyLaunch', 'true');
  }
}
