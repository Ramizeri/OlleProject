import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxMorseService } from "ngx-morse";
import { FormsModule } from '@angular/forms';
import { MorseService } from './services/morse.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

  constructor(
    private _morse: NgxMorseService,
    private _getApi: MorseService
  ) {
    setInterval(() => {
      this._getApi.postApi({ command: "-.-. .--. ..-" }, (res) => {
        this.data = res['data'];
        for (let index = 0; index < this.data.length; index++) {
          this.html += `
          <br>
          <h3>İşlemcİ ${index + 1}</h3> <br>
          <b>Model</b> = ${this.morseDecoder(res['data'][index]['model'])} <br>
          <b>Hız</b> = ${this.morseDecoder(res['data'][index]['speed'])} <br>
          <b>Times</b> = <br>
          <b>User</b> = ${this.morseDecoder(res['data'][index]['times']['user'])}
          <b>Nice</b> = ${this.morseDecoder(res['data'][index]['times']['nice'])}
          <b>Sys</b> = ${this.morseDecoder(res['data'][index]['times']['sys'])}
          <b>Idle</b> = ${this.morseDecoder(res['data'][index]['times']['idle'])}
          <b>Irq</b> = ${this.morseDecoder(res['data'][index]['times']['irq'])}
          <br>
          `;
        }
      })
      this.html = "";
    }, 1000)
  }
  // https://we.tl/t-qTvihf9oKx
  data: string[] = [];
  html = "";

  morseDecoder(text: string) {
    return this._morse.decode(text);
  }

  morseEncoder(text: string) {
    return this._morse.encode(text);
  }

}
