import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
declare const navigator: any;
declare const MediaRecorder: any;

@Component({
  moduleId: module.id,
  selector: 'app-record-audio',
  template: `<button [disabled]="isRecording" (click)="record()">Record</button>
             <button [disabled]="!isRecording" (click)="stop()">Stop</button>`,
  styleUrls: ['record-audio.component.less']
})
export class RecordAudioComponent {
  public isRecording = false;
  private chunks: any = [];
  private mediaRecorder: any;

  @Output()
  stopAudio = new EventEmitter<File>();

  constructor() {
    const onSuccess = stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.onstop = e => {
        const audio = new Audio();
        const blob = new Blob(this.chunks, { type: 'audio/ogg' });
        this.chunks.length = 0;
        this.stopAudio.emit(new File([blob], 'audio.ogg'));
        audio.src = window.URL.createObjectURL(blob);
        audio.load();
        audio.play();
      };

      this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    };

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.mediaDevices.getUserMedia;

    navigator.getUserMedia({ audio: true }, onSuccess, e => console.log(e));
  }

  public record() {
    this.isRecording = true;
    this.mediaRecorder.start();
  }

  public stop() {
    this.isRecording = false;
    this.mediaRecorder.stop();
  }
}
