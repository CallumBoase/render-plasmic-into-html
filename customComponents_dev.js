//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';
import PlasmicComponentLoader from './components/PlasmicComponentLoader/PlasmicComponentLoader';

//Declaring our customComponents variable which will be set to the window object at the end
const customComponents = {render: {}}

//Declaring functions that can be called to render our components
customComponents.render.plasmicComponent = function plasmicComponent(settings = { targetDiv, projectId, publicToken, preview, component, componentProps }) {
  ReactDOM.render(
    <PlasmicComponentLoader
      projectId={settings.projectId}
      publicToken={settings.publicToken}
      preview={settings.preview}
      component={settings.component}
      componentProps={settings.componentProps}
    />,
    document.getElementById(settings.targetDiv)
  );
}

//Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;