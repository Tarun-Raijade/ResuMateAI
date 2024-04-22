import { Component, TemplateRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CommunicateService } from '../Shared/communicate.service';
import { Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [MatButtonModule, RouterModule, MatCardModule, MatIconModule, MatDialogModule],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss'
})
export class PlayComponent {

  selectedFile: File | null = null;
  conversations: any = [];
  Creator = {
    "Me": 0,
    "Bot": 1,
  }

  unsubscribe$ = new Subject<boolean>();
  isLoading: boolean = false;
  templateDialog?: MatDialogRef<PlayComponent>

  questions = ['What is the name of candidate?', 'b', 'c']
  constructor(private router: Router, private communicateService: CommunicateService, private _dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.communicateService.selectedFile$.subscribe(file => {
      this.selectedFile = file,
        this.conversations = [];
      let chat = {
        text: `Resume - ${this.selectedFile?.name.split(".")[0]}. Please feel free to ask questions.`,
        from: this.Creator.Bot,
      }
      this.conversations.push(chat)
    })
  }


  sendQuestion(text: HTMLTextAreaElement): void {
    let question =
    {
      text: text.value,
      from: this.Creator.Me,
    }
    this.conversations.push(question);
    text.value = '';
    this.isLoading = true;
    //API CALL TO SEND THE QUESTION
    const questions = { question: question.text }
    this.communicateService.sendQuestion(questions).pipe(takeUntil(this.unsubscribe$)).subscribe(
      async (res) => {
        this.isLoading = false;

        let botResponse = res.Answer;
        let answer =
        {
          text: botResponse,
          from: this.Creator.Bot,
        }
        this.conversations.push(answer);
      })
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  copyToClipboard(text: string) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';  // Ensure it's not visible
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text to clipboard was ' + msg);
    } catch (err) {
      console.error('Unable to copy text to clipboard:', err);
    }
    document.body.removeChild(textarea);
  }


  /**
     * Opens the select dataset dialog
     * @param templateModal modal reference
     */
  sampleQuestions(templateModal: TemplateRef<any>) {
    this.templateDialog = this._dialog.open(templateModal, {
      minWidth: '50vw',
      maxWidth: '70vw',
    });
  }

}