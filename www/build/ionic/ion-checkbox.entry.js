import { h, registerLazyInstance, registerStyle, createEvent, getElement } from '../ionic.mjs.js';


export class IonCheckbox {

  // @Element() el
  get el() {
    return getElement(this);
  }

  // @Event() el
  ionChange = createEvent(this, 'ionChange', {
    bubbles: false, // optional, only pass when it's false
    composed: false, // optional, only pass when it's false
    cancelable: false, // optional, only pass when it's false
  });

  constructor(elmData) {
    registerLazyInstance(this, elmData);
  }

  render() {
    return h('button', null);
  }
}

registerStyle('ion-checkbox.ios', 'div { color: blue }')