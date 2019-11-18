import React from 'react';
import Loadable from 'react-loadable';
import { Load } from  './style';
const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading() {
  	return <Load>Loading</Load>
  }
});

export default () => <LoadableComponent/>
