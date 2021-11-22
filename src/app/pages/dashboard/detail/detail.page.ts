import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestapiService } from 'src/app/services/api/requestapi.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: any;
  todo = [];
  constructor(
    private activated: ActivatedRoute,
    private api: RequestapiService
  ) {

    this.id = this.activated.params.subscribe((params) => {
      this.id = params.id;
      this.getProjectDetail();
    });

  }

  ngOnInit() {

  }

  getProjectDetail() {
    this.api.FetchInformation(`projects/details/${this.id}`).then((data) => {
      this.todo = data;
      console.log(this.todo);

    });
  }
}
