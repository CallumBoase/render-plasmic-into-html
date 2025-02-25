//Helper function to setup a shadow dom to render a component into
//This is to avoid stylesheet collisions between the main document and the component
//This component copies the styles from the main document to the shadow dom
//when the <style> element id is 'custom-component-styles' (<style> elements inserted by the dist version of this repo)
//Or when the <style> element has 'data-vite-dev-id' attribute (<style> elements inserted by the dev version of this repo when running npm run dev)

export function setupShadowDOM(targetElement) {
  let shadowRoot = targetElement.shadowRoot;

  if (!shadowRoot) {
    shadowRoot = targetElement.attachShadow({ mode: 'open' });
  }

  // Use a specific container within the shadow DOM for React rendering
  let shadowContainer = shadowRoot.querySelector('#shadow-container');

  if (!shadowContainer) {
    shadowContainer = document.createElement('div');
    shadowContainer.id = 'shadow-container';
    shadowRoot.appendChild(shadowContainer);

    // move styling from main document to shadow dom (ones that exist at the time of setup)
    moveStylesToShadowDom(shadowRoot);

    // Setup observer for dynamically inserted styles that may be inserted by cssinjs solutions later
    setupStyleObserver(shadowRoot);
  }

  return shadowContainer;
}

function setupStyleObserver(shadowRoot) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        moveStylesToShadowDom(shadowRoot);
      }
    }
  });

  observer.observe(document.head, { childList: true, subtree: true });
}

export function moveStylesToShadowDom(shadowRoot) {
  // Copy all relevant styles from the main document to the shadow dom
  // Since the shadow dom is isolated from the main document, we need to copy over the styles
  const allStyleElements = document.querySelectorAll('head style');
  const styleElementsToClone = Array.from(allStyleElements)
    .filter(el => isViteDevModeTag(el) || isStyleTagCreatedByViteCssinjs(el) || isStyleTagCreatedByAntCssinjs(el));

  styleElementsToClone.forEach(originalStyleElement => {

    // Check if an identical style tag already exists in the shadow dom
    if (checkIfIdenticalTagExistsInShadowDom(shadowRoot, originalStyleElement)) {
      // If it does, we don't need to copy this style tag over
      return;
    } else {
      //It doesn't yet exist, so copy it over
      //Clone the element and append it to the shadow dom
      const clonedStyleElement = originalStyleElement.cloneNode(true);
      shadowRoot.prepend(clonedStyleElement);
    }
  });
}

function checkIfIdenticalTagExistsInShadowDom(shadowRoot, styleElement) {
  //Check for existence of identical style tag in shadow dom already by id or (if no id) the inner content
  const existingStyleElement = 
    styleElement.id && shadowRoot.querySelector(`style#${styleElement.id}`) || 
    Array.from(shadowRoot.querySelectorAll('style')).find(el => el.innerHTML === styleElement.innerHTML);
  return existingStyleElement ? true : false;
}

function isViteDevModeTag(styleElement) {
  // When using Vite in dev mode it sometimes inserts style tags with a 'data-vite-dev-id' attribute
  // We can check for this attribute to determine if the style tag was created by Vite in dev mode
  return styleElement.getAttribute('data-vite-dev-id') !== null;
}

function isStyleTagCreatedByViteCssinjs(styleElement) {
  // We configure vite to inject all imported .css and .module.css files as a <style> tag with id 'custom-component-styles'
  // So we can check for this id to determine if the <style> tag was created by us (via Vite)
  return styleElement.id === 'custom-component-styles' || styleElement.getAttribute('data-vite-dev-id') !== null;
}

function isStyleTagCreatedByAntCssinjs(styleElement) {
  // Plasmic seems to allow Ant to create <style> tags in the dom using cssinjs
  // These <style> tags have some predictable attributes, some of which have predictable values
  // We therefore check for these attributes to determine if the <style> tag was created by Ant cssinjs
  // So we can copy them over

  const isAntCssinjsTag = (
    styleElement.attributes.getNamedItem('data-rc-order')?.value === 'prependQueue' &&
    styleElement.attributes.getNamedItem('data-css-hash') !== null &&
    styleElement.attributes.getNamedItem('data-token-hash') !== null
  );

  return isAntCssinjsTag;
}