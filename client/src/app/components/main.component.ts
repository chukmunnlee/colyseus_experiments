import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreateChatRoom} from '../models';
import {GameService} from '../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

  private fb = inject(FormBuilder)
  private router = inject(Router)
  private gameSvc = inject(GameService)

  protected form!: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: this.fb.control('', [ Validators.required, Validators.minLength(3) ]),
      roomName: this.fb.control('', [ Validators.required, Validators.minLength(3) ])
    })
  }

  createRoom() {
    const roomDetail = this.form.value as CreateChatRoom
    console.info('>>> CREATE room detail: ', roomDetail)
    this.gameSvc.createRoom(roomDetail)
      .then(() => this.router.navigate(['/chat']))
  }
  joinRoom() {
    const roomDetail = this.form.value as CreateChatRoom
    console.info('>>> JOIN room detail: ', roomDetail)
    this.gameSvc.createRoom(roomDetail)
        .catch(error => console.error('ERROR: ', error))
  }

}
