import { Component } from '@angular/core';
import { ChatsComponent } from '../chats/chats.component';
import { PlayComponent } from '../play/play.component';
import { PdfComponent } from '../pdf/pdf.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChatsComponent,PlayComponent,PdfComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
