import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommunicateService } from '../Shared/communicate.service';
import { AbstractControl, FormBuilder, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, MatFormFieldModule, ReactiveFormsModule, MatTabsModule, CommonModule, MatInputModule, MatCardModule, MatButtonModule, FormsModule, CarouselModule, MatRadioModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  jobForm: UntypedFormGroup;
  file: any
  unsubscribe$ = new Subject<boolean>();
  submitted: boolean = false;
  uploadedResume: any;
  showResponse: boolean = false;
  showResumeName: boolean = false;
  resumeName: any;
  descriptionValue: string = ''
  startChat: boolean = false;
  loading: boolean = false;
  feedback: any
  isLinear = false;

  theories = [{ 'head': 'Resume Collection', 'theory': 'Get resume that showcase different skills and experiences.' },
  { 'head': 'Job Description ', 'theory': 'Provide job description as per the requirements' },
  { 'head': 'Select any criteria ', 'theory': 'Based on selected criteria, get the AI generated response' }];

  constructor(private router: Router, private communicateService: CommunicateService, private _formBuilder: FormBuilder, private _fb: UntypedFormBuilder,

  ) {
    this.jobForm = this._fb.group({
      description: [
        '',
        [
          Validators.required
        ],
      ],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.jobForm.controls;
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.communicateService.setSelectedFile(this.file);
    if (this.file) {
      //._spinner.showSpinner();
      const formData: FormData = new FormData();
      formData.append('file', this.file, this.file.name);
      this.showResumeName = true;
      this.startChat = true;
      this.resumeName = this.file.name
    }
    else {
      this.startChat = true;
      this.showResumeName = false;
    }
  }

  letsChat() {
    this.router.navigate(['/dashboard']);
  }

  summitForm() {
    this.submitted = true;
    const formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('descriptionValue', this.jobForm.get('description')?.value);

    if (this.jobForm.get('description')?.value != '') {
      // Send PDF to the API
      this.loading = true;
      this.communicateService.sendData(formData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          async (res) => {
            console.log("🚀 ~ res:", res)
            this.showResponse = true;
            this.loading = false;
            this.feedback = res;
          },
          (error) => {
            console.log("🚀 ~ error:", error)
          }
        );
    }
  }
}


