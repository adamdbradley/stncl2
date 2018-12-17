

// treeshakable
export function createEvent(ref, name, options) {
  const elm = refMap.get(ref).elm;
  return {
    emit(detail) {
      return elm.dispatchEvent(new CustomEvent(name, { ...options, detail}))
    }
  }
}

// treeshakable
export function getElement(ref) {
  return refMap.get(ref).elm;
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
      return getValue(this, memberName);
    },
    set(newValue) {
      setValue(this, memberName, newValue);
    }
  })
}

function scheduleUpdate(meta) {
  // queue
  requestAnimationFrame(() => {
    render(meta.instance);
  });
}

function render(instance) {
  console.log('render')
  instance.render();
}

function setValue(ref, memberName, newValue) {
  const meta = refMap.get(ref);
  const instanceValues = meta.instanceValues;
  const oldValue = instanceValues.get(memberName);
  if (oldValue !== newValue) {
    console.log('value changed from', oldValue, 'to', newValue);
    instanceValues.set(memberName, newValue);

    scheduleUpdate(meta);
    return true;
  }
  return false;
}

export function getValue(ref, memberName) {
  return refMap.get(ref).instanceValues.get(memberName);
}

export function registerLazyInstance(lazyInstance, elmData) {
  console.log('registerLazyInstance', lazyInstance, elmData)
  elmData.instance = lazyInstance;
  refMap.set(lazyInstance, elmData);
}

const refMap = new WeakMap();
const styles = new Map();

function bootstrapLazyComponents(cmpData) {
  console.log('bootstrapLazyComponents')
  cmpData.forEach(cmpMeta => {

    class LazyHost extends HTMLElement {

      constructor() {
        // create meta here, because connectedCallback can be called many times
        refMap.set(elm, {
          instanceValues: new Map(),
          instance: null,
          elm: this
        });
      }
      connectedCallback() {
        connectedCallback(this, cmpMeta)
      }

    }
    proxyMembers(LazyHost, cmpMeta);
    customElements.define(cmpMeta[0], LazyHost);
  });
}


async function connectedCallback(elm, cmpMeta) {
  console.log('connected', elm.tagName);

  const meta = refMap.get(elm);
  const module = await import('./ionic/ion-checkbox.entry.js');
  const LazyComponent = module.IonCheckbox;

  if (!LazyComponent.proxied) {
    proxyMembers(LazyComponent, cmpMeta);
    LazyComponent.proxied = true;
  }

  new LazyComponent(meta);
  scheduleUpdate(meta);
}


bootstrapLazyComponents([['ion-checkbox', [['checked']]]]);


export function registerStyle(styleId, style) {
  console.log('registerStyle', styleId, style);
  styles.set(styleId, style);
}


export function h() {
  console.log('h');
}
