import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contactus',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent implements OnInit {
  loading: string = '';
  contactForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form group in the constructor if you prefer
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      toEmail: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      toEmail: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.sendEmail(formData);
    }
  }

  sendEmail(formData: any): void {
    let url = 'https://aipazfunction.azurewebsites.net/api/SendContactDetails';
    //const url = 'http://localhost:7071/api/SendContactDetails';
    const headers = new HttpHeaders({
      'x-functions-key': 'add your key here',  // Use your local function key here
    });
    //const url = 'https://aipazfunction.azurewebsites.net/api/SendContactDetails?name=Anurag&toEmail=anuraglearnproject@gmail.com&subject=Azure%20Function%20Testing&message=this%20is%20just%20a%20message%20body%20text.';
    this.loading = 'loading...';
    let data = JSON.stringify(formData);
    let jsonData = JSON.parse(data);
    this.loading = 'processing: <br>' + data;
    let queryString = new URLSearchParams(jsonData).toString();
    url += "?" + queryString;
    console.log(url);
    this.http.get(url, { headers: headers }).subscribe({
      next: (response) => {
        this.loading = 'Form submitted successfully: ' + JSON.stringify(response);
        this.loading += '<br><strong>Thank you for contacting us!?</strong>';
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        this.loading = 'Something went wrong. Please try again later.: ' + JSON.stringify(error) +
          " processed data: " + data;
      }
    });
  }
}
