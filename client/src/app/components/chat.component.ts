import { Component, inject, OnInit } from '@angular/core';
import { ChatRoomStore } from '../services/chat.store'
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  private title = inject(Title)
  private activatedRoute = inject(ActivatedRoute)
  private chatService = inject(ChatService)
  private router = inject(Router)
  protected chatStore = inject(ChatRoomStore)

  protected roomId!: string

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.params['roomId']
    this.title.setTitle(`Room: ${this.roomId}`)
  }

  leave() {
    this.chatService.disconnect()
    this.router.navigate(['/'])
  }

}
