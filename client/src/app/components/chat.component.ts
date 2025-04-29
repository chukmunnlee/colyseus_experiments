import { Component, inject, OnInit } from '@angular/core';
import { ChatRoomStore } from '../services/chat.store'
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ChatService} from '../services/chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from '../models';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  private title = inject(Title)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)

  protected chatSvc = inject(ChatService)
  protected chatStore = inject(ChatRoomStore)

  protected roomId!: string

  ngOnInit(): void {
    this.roomId = this.activatedRoute.snapshot.params['roomId']
    this.title.setTitle(`Room: ${this.roomId}`)
  }

  leave() {
    this.chatSvc.disconnect()
    this.router.navigate(['/'])
  }

  send(chatText: any) {
    if (!chatText.value)
      return
    this.chatSvc.send(chatText.value)
    chatText.value = ''
  }

}
