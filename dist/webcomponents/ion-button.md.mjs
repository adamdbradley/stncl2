// all self contained, no imports/exports
// defines itself w/ customElements.define

// side-effect webpack import self contained, self defining
// import '@ionic/core/webcomponents/ion-button.md';

// cdn script tag
// <script src="http://unpkg.com/ionic/core/webcomponents/ion-button.md.mjs" type="module"></script>


function h() {}
function setValue() {}
class StencilElement {}

class IonButton extends StencilElement {
  render() {
    return h()
  }
  static get style() {
    return `.ios{}`
  }
  static get styleMode() {
    return `ios`
  }
  get text() {
    return plt.getValue(this, 'text');
  }
  set text(value) {
    plt.setValue(this, 'text', value)
  }
}

customElements.define('ion-button', )

const values = new WeakMap();

export function reset() {
  values.clear();
}

export function getValue(elm, propName) {
  return values
}