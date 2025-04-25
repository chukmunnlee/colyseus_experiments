import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {provideHttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import { MainComponent } from './components/main.component';
import {GameService} from './services/game.service';
import {ChatRoomStore} from './services/chat.store';
import { ChatComponent } from './components/chat.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'chat', component: ChatComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent, MainComponent, ChatComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ provideHttpClient(), GameService, ChatRoomStore ],
  bootstrap: [AppComponent]
})
export class AppModule { }
