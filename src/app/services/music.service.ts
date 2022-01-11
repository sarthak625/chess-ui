import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  audio: any;
  blockedTill: Date = new Date();
  constructor() { }

  playAudio(fileLocation: string) {
    console.log(this.blockedTill);
    if (this.blockedTill.getTime() > new Date().getTime()) return;
    this.audio = new Audio();
    this.audio.src = fileLocation;
    this.audio.load();
    this.audio.play();
    this.audio.addEventListener('loadeddata', () => {
      let duration = this.audio.duration;
      // The duration variable now holds the duration (in seconds) of the audio clip
      this.blockedTill = new Date(new Date().getTime() + duration * 1000);
      console.log({ duration });
    })
    console.log(this.audio);
  }

  playPieceMovedSound() {
    this.playAudio('assets/audio/lower_tone.wav');
  }
  
  playPieceCapturedSound() {
    this.playAudio('assets/audio/higher_tone.wav');
  }
  
  playKingInCheckSound() {
    this.playAudio('assets/audio/omae_wa_mo_shinde_iru_1.mp3');
  }
}
