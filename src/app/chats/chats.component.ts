import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent implements OnInit, OnDestroy {


  constructor() { }

  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
  
  }
}

