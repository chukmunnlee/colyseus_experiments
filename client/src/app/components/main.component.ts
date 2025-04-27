import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateChatRoom} from '../models';
import {ChatService} from '../services/chat.service'
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private title = inject(Title)
  private fb = inject(FormBuilder)
  private router = inject(Router)
  private chatSvc = inject(ChatService)

  protected form!: FormGroup

  ngOnInit(): void {
    this.title.setTitle('Welcome to Angular-Colyseus-Nest Chat')
    this.form = this.fb.group({
      userName: this.fb.control('', [ Validators.required, Validators.minLength(3) ]),
      roomName: this.fb.control('', [ Validators.required, Validators.minLength(3) ])
    })
  }

  roomOnly(): boolean {
    return this.form.controls['roomName'].invalid
  }

  createRoom() {
    const roomDetail = this.form.value as CreateChatRoom
    this.chatSvc.createRoom(roomDetail)
        .then((room) => this.router.navigate(['/chat', room.roomId]))
        .catch(error => alert(`CREATE ERROR: ${JSON.stringify(error)}`))
  }

  joinRoom() {
    const roomDetail = this.form.value as CreateChatRoom
    console.info('>>> JOIN room detail: ', roomDetail)
    this.chatSvc.joinRoom(roomDetail)
        .then((room) => this.router.navigate(['/chat', room.roomId]))
        .catch(error => alert(`JOIN ERROR: ${JSON.stringify(error)}`))
  }

}
