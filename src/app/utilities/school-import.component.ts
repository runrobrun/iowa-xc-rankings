import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';

@Component({
  selector: 'app-school-import',
  standalone: true,
  imports: [],
  templateUrl: './school-import.component.html',
  styleUrl: './school-import.component.css'
})
export class SchoolImportComponent {
  title='importing schools';
  csvRecords: Array<any> | NgxCSVParserError = [];
  header: boolean = false;

  constructor(private ngxCsvParser: NgxCsvParser) { }
  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
      next: (result): void => {
        this.csvRecords = result;
        console.log(this.csvRecords);
      },
      error: (error: NgxCSVParserError): void => {
        console.log('Error', error);
      }
    });
  }
}
