// every component exported to be imported by webpack/rollup
// does NOT customElements.define

// import { IonButton_ios } from '@ionic/core/webcomponents' (with a mode)
// import { IonSlides } from '@ionic/core/webcomponents' (no mode)

// customElements.define('my-button', IonButton);


import { h, StencilElement } from './stencil-element';
export { h, StencilElement } from './stencil-element';
// this StencilElement is optimized for this build of this exported set of components

class IonButton extends StencilElement {
  render() {
    return h()
  }
}

export class IonButton_ios extends IonButton {
  static get style() {
    return `.ios {}`
  }
  static get styleMode() {
    return `ios`
  }
}


export class IonButton_md extends IonButton {
  static get style() {
    return `.md {}`
  }
  static get styleMode() {
    return `md`
  }
}

export { h, StencilElement } from './stencil-element';
