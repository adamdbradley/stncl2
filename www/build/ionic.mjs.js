

function render(instance) {
  console.log('render')
  instance.render();
}


export function proxyMembers(Cstr, cmpMeta) {
  console.log('proxyMembers', Cstr, cmpMeta);

  cmpMeta[1].forEach(member => {
    proxyMember(Cstr, member[0]);
  });
}


function proxyMember(Cstr, memberName) {
  console.log('proxyMember', memberName);

  Object.defineProperty(Cstr.prototype, memberName, {
    get() {
      return ref.get(this).instanceValues.get(memberName);
    },
    set(newValue) {
      const refItem = ref.get(this);
      if (setValue(memberName, refItem.instanceValues, newValue)) {
        if (refItem.instance) {
          render(refItem.instance);
        }
      }
    }
  })
}


function setValue(memberName, instanceValues, newValue) {
  const oldValue = instanceValues.get(memberName);
  if (oldValue !== newValue) {
    console.log('value changed from', oldValue, 'to', newValue);

    instanceValues.set(memberName, newValue)
    return true;
  }
  return false;
}


export function registerLazyInstance(lazyInstance, elmData) {
  console.log('registerLazyInstance', lazyInstance, elmData)
  elmData.instance = lazyInstance;
  ref.set(lazyInstance, elmData);
}

const ref = new WeakMap();
const styles = new Map();

function bootstrapLazyComponents(cmpData) {
  console.log('bootstrapLazyComponents')
  cmpData.forEach(cmpMeta => {

    class LazyHost extends HTMLElement {

      connectedCallback() {
        connectedCallback(this, cmpMeta)
      }

    }
    proxyMembers(LazyHost, cmpMeta);
    customElements.define(cmpMeta[0], LazyHost);
  });
}


async function connectedCallback(elm, cmpMeta) {
  console.log('connected', elm.tagName)
  const elmData = {
    instanceValues: new Map(),
    instance: null,
  };
  ref.set(elm, elmData);

  const module = await import('./ionic/ion-checkbox.entry.js');
  const LazyComponent = module.IonCheckbox;

  if (!LazyComponent.proxied) {
    proxyMembers(LazyComponent, cmpMeta);
    LazyComponent.proxied = true;
  }

  new module.IonCheckbox(elmData);

  render(elmData.instance)
}


bootstrapLazyComponents([['ion-checkbox', [['checked']]]]);


export function registerStyle(styleId, style) {
  console.log('registerStyle', styleId, style);
  styles.set(styleId, style);
}


export function h() {
  console.log('h');
}
