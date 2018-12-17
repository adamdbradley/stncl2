import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ion-button'
})
export class IonButton {

  @Element() el: HTMLElement;
  @Prop() text: string;
  @Event({
    bubbles: false,
    cancellable: false,
    composite: false
  }) event: EventEmitter;

  render() {
    <button>{this.text}</button>
  }


}
