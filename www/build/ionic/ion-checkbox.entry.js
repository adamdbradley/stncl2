import { h, registerLazyInstance, registerStyle, createEvent, getElement } from '../ionic.mjs.js';


export class IonCheckbox {

  constructor(elmData) {
    registerLazyInstance(this, elmData);

    // @Event() el
    this.ionChange = createEvent(this, 'ionChange', {
      bubbles: false, // optional, only pass when it's false
      composed: false, // optional, only pass when it's false
      cancelable: false, // optional, only pass when it's false
    });
  }

  // @Element() el
  get el() {
    return getElement(this);
  }

  render() {
    this.el.textContent = 'ion-checkbox';
    return h('button', null);
  }
}

registerStyle('ion-checkbox.ios', 'div { color: blue }')