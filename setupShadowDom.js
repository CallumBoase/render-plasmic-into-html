//Helper function to setup a shadow dom to render a component into
//This is to avoid stylesheet collisions between the main document and the component
//This component copies the styles from the main document to the shadow dom when those style tags were inserted by Plasmic
//To ensure that the styles are available in the shadow dom too
//It also sets up an observer to capture dynamic font imports inserted by Plasmic inside the shadow dom and copies them to the main document

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

    // Set up observer on shadowContainer to capture dynamic inserts by Plasmic of style tags containing font imports
    // When detected, add a <link> tag to import that font in the entire parent document
    // This avoids an issue where font imports do not work in the shadow dom via injected style tags from Plasmic
    setupShadowDomFontImportsObserver(shadowContainer);

    // move styling from main document to shadow dom (ones that exist at the time of setup)
    moveStylesToShadowDom(shadowRoot);

    // Setup observer for dynamically inserted styles that may be inserted by cssinjs solutions later
    setupStyleObserver(shadowRoot);
  }

  return shadowContainer;
}

// Set up observer on the shadow dom container so that whenever a style tag is added or updated,
// we extract @import font rules and copy them to document.head. This ensures that fonts imported in shadow styles 
// are available in the whole document & available in the shadow too
function setupShadowDomFontImportsObserver(container) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (node.nodeName && node.nodeName.toLowerCase() === 'style') {
          processFontImports(node.textContent);
          if (!node.__observing) {
            node.__observing = true;
            const innerObserver = new MutationObserver(() => {
              processFontImports(node.textContent);
            });
            innerObserver.observe(node, { childList: true, characterData: true, subtree: true });
          }
        }
      }
    }
  });
  observer.observe(container, { childList: true });
}

// Helper function to setup an observer to move styles from the main document to the shadow dom
// This covers the situation where styles are added by Plasmic to the main document which the shadow wouldn't otherwise see
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
    .filter(el => isStyleTagCreatedByAntCssinjs(el));

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
  console.log('isAntCssinjsTag', isAntCssinjsTag);

  return isAntCssinjsTag;
}

// New helper to process @import font rules in style content
function processFontImports(text) {
  const regex = /@import\s+url\((['"]?)(.*?)\1\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const url = match[2];
    if (!document.head.querySelector(`link[rel="stylesheet"][href="${url}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    }
  }
}