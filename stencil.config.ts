import { Config } from '@stencil/core';


export const config: Config = {
  namespace: 'Ionic',
  outputTargets: [
    {
      type: 'www'
    },
    {
      type: 'dist'
    },
    {
      type: 'webcomponent'
    },
    {
      type: 'selfcontained'
    }
  ],
};
