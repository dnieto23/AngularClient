import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormsModule} from '@angular/forms';
import { Register } from './Register';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularClient';
  restItems: any;
  restItemsUrl = 'http://localhost:59139/api/Students/';
  httpOptions: { headers: HttpHeaders; };
  body: any;
  constructor(private http: HttpClient) { }
  columnDefs = [
    {headerName: 'Student', field: 'Student'},
    {headerName: 'Language & Arts', field: 'LanguageAndArts'},
    {headerName: 'Science', field: 'Science'},
    {headerName: 'Social Studies', field: 'SocialStudies'},
    {headerName: 'Maths', field: 'Maths'},
  ];

@Input() Register = {
  Student: '',
    LanguageAndArts: '',
    Science: '',
    SocialStudies: '',
    Maths: ''
};

  ngOnInit() {
    this.getRestItems();
  }

  getRestItems(): void {
    this.restItemsServiceGetRestItems('GetAllData')
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems);
      }
    );
  }

  // getRestItemsByName(Student: string) {
  //   this.restItems = [];
  //   this.restItemsServiceGetRestItems('GetRecByField?Mark=Student&Vaue=' + Student)
  //   .subscribe(
  //     restItems => {
  //       this.restItems = restItems;
  //       console.log(this.restItems);
  //     }
  //   );
  // }

  getRestItemsByName(Student: string) {
    this.restItems = [];
    this.body = {Mark: 'Student', Value: Student};
    console.log(this.body);
    this.restItemsServiceGetRestItemsPost('GetByField', this.body)
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems);
      }
    );
  }

  getRestItemsByLAndA(Mark: string) {
    this.restItems = [];
    this.body = {Mark: 'LanguageAndArts', Value: Mark};
    console.log(this.body);
    this.restItemsServiceGetRestItemsPost('GetByField', this.body)
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems);
      }
    );
  }

  getRestItemsByScience(Mark: string) {
    this.restItems = [];
    this.body = {Mark: 'Science', Value: Mark};
    console.log(this.body);
    this.restItemsServiceGetRestItemsPost('GetByField', this.body)
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems);
      }
    );
  }

  getRestItemsBySocialStudies(Mark: string) {
    this.restItems = [];
    this.body = {Mark: 'SocialStudies', Value: Mark};
    console.log(this.body);
    this.restItemsServiceGetRestItemsPost('GetByField', this.body)
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems);
      }
    );
  }

  getRestItemsByMaths(Mark: string) {
    this.restItems = [];
    this.body = {Mark: 'Maths', Value: Mark};
    console.log(this.body);
    this.restItemsServiceGetRestItemsPost('GetByField', this.body)
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems);
      }
    );
  }

  getRestItemsMarksUpper80(): void {
    this.restItemsServiceGetRestItems('GetMarksUp80')
    .subscribe(
      restItems => {
        this.restItems = restItems;
        console.log(this.restItems);
      }
    );
  }

  restItemsServiceGetRestItems(met: string) {
    this.body = [];
    return this.http.get<any[]>(this.restItemsUrl + met)
    .pipe(map(data => data));
  }

  restItemsServiceGetRestItemsPost(met: string, register: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log(register);
    return this.http.post<any[]>(this.restItemsUrl + met, register, httpOptions)
    .pipe(map(data => data));
  }


}
