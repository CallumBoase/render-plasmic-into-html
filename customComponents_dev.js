// Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';
import PlasmicComponentLoader from './components/PlasmicComponentLoader/PlasmicComponentLoader';

// Declaring our customComponents variable which will be set to the window object at the end
const customComponents = { render: {} }

// Function to setup or reuse a shadow DOM on the target element
// This lets styling of the Plasmic component be isolated from the main HTML to avoid CSS conflicts
function setupShadowDOM(targetElement) {
  let shadowRoot = targetElement.shadowRoot;
  if (!shadowRoot) {
    shadowRoot = targetElement.attachShadow({ mode: 'open' });
    // Optional: Insert styles or links to stylesheets here
  }
  // Use a specific container within the shadow DOM for React rendering
  let shadowContainer = shadowRoot.querySelector('#shadow-container');
  if (!shadowContainer) {
    shadowContainer = document.createElement('div');
    shadowContainer.id = 'shadow-container';
    shadowRoot.appendChild(shadowContainer);
  }
  return shadowContainer; // Return the shadow container as the new render target
}

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
