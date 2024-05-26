import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {Classification} from "../classifications/classification";
import {School} from "../schools/school";
import {SchoolsService} from "../schools/schools.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-school-import',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './school-import.component.html',
  styleUrl: './school-import.component.css'
})
export class SchoolImportComponent {
  title='importing schools';
  csvRecords: Array<any> | NgxCSVParserError = [];
  header: boolean = false;
  importedSchool: string | undefined;

  constructor(private ngxCsvParser: NgxCsvParser, private schoolsService: SchoolsService) { }
  @ViewChild('fileImportInput') fileImportInput: any;
  importing: boolean = false;
  schoolCount: number | undefined;

  fileChangeListener($event: any): void {

    const files = $event.srcElement.files;
    this.header = (this.header as unknown as string) === 'true' || this.header === true;

    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',', encoding: 'utf8' })
      .pipe().subscribe({
      next: (result): void => {
        this.csvRecords = result;
        this.processCsvRecords(this.csvRecords);
      },
      error: (error: NgxCSVParserError): void => {
        console.log('Error', error);
      }
    });
  }

  private processCsvRecords(csvRecords: Array<any> | NgxCSVParserError) {
    if (csvRecords instanceof NgxCSVParserError) {
      console.error('Error while parsing: ', csvRecords);
    } else {
      this.importing = true;
      // Note: Guard against potential non-array input
      (csvRecords as Array<any>)?.forEach((record, recordIndex) => {
        const newSchool: Partial<School> = {
          schoolName: record[0],
          schoolClassification: record[1],
          schoolCoop: record[2]
        }
        this.schoolsService.createSchool(newSchool)
        this.schoolCount = recordIndex + 1
        // record.forEach((column: any, columnIndex: any) => {
        //   console.log(`\tColumn ${columnIndex} : ${column}`);
        // })
      })
    }
  }
}
