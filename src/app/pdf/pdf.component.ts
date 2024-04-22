import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommunicateService } from '../Shared/communicate.service';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.scss'
})
export class  PdfComponent {
  zoomSize: number = 1;
  selectedFile: File | null = null;

  constructor(private sanitizer: DomSanitizer, private communicateService: CommunicateService) { }

  ngOnInit() {
    this.communicateService.selectedFile$.subscribe(file => {
      this.selectedFile = file;
    });
  }



  get sanitizedPdfURL(): SafeResourceUrl {
    if (this.selectedFile) {
      const pdfPath = URL.createObjectURL(this.selectedFile); // Adjust the path as needed
      return this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
    }
    else {
      const pdfPath = '.././../../assets/Winjit ICICI insurance policy.pdf';
      return this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
    }
  }

  zoomIn = () => (this.zoomSize += 0.5);
  zoomOut = () => (this.zoomSize -= 0.5);


}

