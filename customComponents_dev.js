// Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';
import PlasmicComponentLoader from './components/PlasmicComponentLoader/PlasmicComponentLoader';
import { setupShadowDOM } from './setupShadowDom';

// Declaring our customComponents variable which will be set to the window object at the end
const customComponents = { render: {} }

// Register a plasmicComponent renderer
customComponents.render.plasmicComponent = function plasmicComponent(settings = { targetDiv, projectId, publicToken, preview, component, componentProps, useShadowDOM }) {

  const targetElement = document.getElementById(settings.targetDiv);
  let renderTarget = targetElement;

  // Setup a shadow DOM if indicated
  if (settings.useShadowDOM) {
    renderTarget = setupShadowDOM(targetElement);
  }

  ReactDOM.render(
    <PlasmicComponentLoader
      projectId={settings.projectId}
      publicToken={settings.publicToken}
      preview={settings.preview}
      component={settings.component}
      componentProps={settings.componentProps}
    />,
    renderTarget
  );
}

// Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;
