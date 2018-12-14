import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ion-button'
})
export class IonButton {

  @Prop() text: string;

  render() {
    <button>{this.text}</button>
  }

}