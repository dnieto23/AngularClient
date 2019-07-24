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
  showM: boolean;
  showSS: boolean;
  showSC: boolean;
  showLA: boolean;
  showS: boolean;
  dropdownList: any;
  dropdownSettings: any;
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
    this.initFields();
    this.initDropDown();
    this.getRestItems();
  }

  initFields(): void {
    this.showS = false;
    this.showLA = false;
    this.showSC = false;
    this.showSS = false;
    this.showM = false;
  }

  initDropDown(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Student' },
      { item_id: 2, item_text: 'Language & Arts' },
      { item_id: 3, item_text: 'Science' },
      { item_id: 4, item_text: 'Social Studies' },
      { item_id: 5, item_text: 'Maths' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text'
    };
  }
  onItemSelect(item: any) {
    switch (item.item_id) {
      case 1:
        this.showS = !this.showS;
        this.Register.Student = this.showS ? this.Register.Student : '';
        break;
      case 2:
        this.showLA = !this.showLA;
        this.Register.LanguageAndArts = this.showS ? this.Register.LanguageAndArts : '';
        break;
      case 3:
        this.showSC = !this.showSC;
        this.Register.Science = this.showS ? this.Register.Science : '';
        break;
      case 4:
        this.showSS = !this.showSS;
        this.Register.SocialStudies = this.showS ? this.Register.SocialStudies : '';
        break;
      case 5:
        this.showM = !this.showM;
        this.Register.Maths = this.showS ? this.Register.Maths : '';
        break;
      default:
        break;
    }
  }
  getRestItems(): void {
    this.restItemsServiceGetRestItems('GetAllData')
    .subscribe(
      restItems => {
        this.restItems = restItems;
      }
    );
  }
  getRestItemsByFilters(s: string, la: string, sc: string, ss: string, m: string): void {
    this.restItems = [];
    this.body = {
      Student: s,
      LanguageAndArts: this.validateTextNumber(la),
      Science: this.validateTextNumber(sc),
      SocialStudies: this.validateTextNumber(ss),
      Maths: this.validateTextNumber(m)
    };
    console.log(this.body);
    this.restItemsServiceGetRestItemsPost('GetByFiters', this.body)
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

  validateTextNumber(text: string) {
    return text === '' ? '-1' : text;
  }


}
