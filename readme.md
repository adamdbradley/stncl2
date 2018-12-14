```

{
  type: 'www'
},

- www
  - build
    - ionic
      - ion-lazy.entry.js
      - ion-lazy2.entry.js
      - ion-lazy3.entry.js
    - ionic.js (es5, amd) nomodule
    - ionic.mjs (esm) type=module


<html>
  <script src="/build/ionic.mjs" type=module></script>
  <script src="/build/ionic.js" nomodule></script>
</html>


--------------

{
  type: 'dist',
  dir: 'dist'
},

collection:

- dist
  - collection
    - components
      - ion-button.js
    - collection-manifest.json
  - esm (lazy load build for webpack dynaic imports)
    - es5 (es5 target)
      - ion-a.js
      - ion-b.js
      - index.js (lazy, ionic/angular, react, vue)
      - index.mega.raw.js
    - es2017
  - loader
    - index.js (points to esm/es5/index.js)
  - ionic
    - ion-lazy.entry.js
    - ion-lazy2.entry.js
    - ion-lazy3.entry.js
  - ionic.mjs
  - ionic.js

@ionic/core/loader (lazy w/ esm/es5)

import { defineCustomElements } from '@ionic/core/loader';

// user imports this
defineCustomElements();


loader: CDN/NPM LAZY LOAD

<html>
  <script src="http://cdn.npm/dist/ionic.esm.js" type=module></script>
  <script src="http://cdn.npm/dist/ionic.legacy.js" nomodule></script>
</html>



--------------

webcomponents: Bundled Raw web component(s), shared core

{
  type: 'webcomponents',
  dir: 'dist/webcomponents'
},

{
  type: 'selfcontained',
  dir: 'dist/webcomponents'
},

@ionic/core/webcomponents

- dist
  - webcomponents
    - button.js (selfcontained core)
    - button.es5.js (selfcontained core)
    - card.js (selfcontained core)
    - index.js (all components inside index.js all using shared core)

// imported by user using shared core
import { IonButton, IonCard } from '@ionic/core/webcomponents';
customElements.define('ion-button', IonButton);
customElements.define('ion-card', IonCard);



// self contained cores
import '@ionic/core/webcomponent/button';
import '@ionic/core/webcomponent/card';

<script src="http://unpkg.com/ionic/core/webcomponent/button.js" type="module"></script>
<script src="http://unpkg.com/ionic/core/webcomponent/button.es5.js" nomodule></script>


outputs: [
  {
    type: 'www',
    dir: './www'
  },
  {
    type: 'dist'
  },
  {
    type: 'www',
    dir: './www'
  },
  {
    type: 'www',
    dir: './www'
  },
]

```