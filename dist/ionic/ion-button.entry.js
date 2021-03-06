import { h } from '../ionic.js';


export class IonButton {

  render() {
    return h('button', null);
  }

  static get properties() {
    return {
      'text': {
        reflectToAttr: true
      }
    }
  }

  static get is() {
    return 'ion-button'
  }

}