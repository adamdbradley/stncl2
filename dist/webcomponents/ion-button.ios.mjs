// all self contained, no imports/exports
// defines itself w/ customElements.define
// @ionic/core/webcomponents/ion-button.ios

function h() {}
class StencilElement {}
customElements.define('ion-button', class extends StencilElement{
  render() {
    return h()
  }
  static get style() {
    return `.ios {}`
  }
  static get styleMode() {
    return `ios`
  }
})

