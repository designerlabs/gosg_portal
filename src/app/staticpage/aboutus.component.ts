import { Component } from '@angular/core';

@Component({
    templateUrl :  'aboutus.component.html',
    styles : [`
    `]
})

export class AboutusComponent {

 constructor(){
    //this.speak('Jon likes Iced Tea!','');
 }
    // say a message
  speak(text, callback) {
        let u = new SpeechSynthesisUtterance();
        u.text = text;
        u.lang = 'en-US';

        u.onend = function () {
            if (callback) {
                callback();
            }
        };

        u.onerror = function (e) {
            if (callback) {
                callback(e);
            }
        };

        speechSynthesis.speak(u);
    }
}
