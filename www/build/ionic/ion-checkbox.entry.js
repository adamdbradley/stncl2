import { h, registerLazyInstance, registerStyle } from '../ionic.mjs.js';


export class IonCheckbox {

  constructor(elmData) {
    registerLazyInstance(this, elmData);
  }

  render() {
    return h('button', null);
  }

}

registerStyle('ion-checkbox.ios', 'div { color: blue }')