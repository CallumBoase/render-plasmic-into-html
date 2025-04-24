## Important note on branch 1.0.0-last-version-deployed-to-netlify
This branch should not be deleted. It is here to create the last version deployed to Netlify for legacy method of importing the script. See details at bottom of readme.

# render-plasmic-into-html
Render a plasmic component or page into a HTML page using the react API, instead of the normal Render API. This is more functional and flexible than using Plasmic's render API.

Plasmic react-api docs: https://docs.plasmic.app/learn/react-api/

Important note: this repo ONLY supports components that are natively available in Plasmic. It will NOT render Plasmic components that contain custom code components that you registered in Plasmic studio. If you need this functionality, see the more complex but powerful option: [Plasmic-codegen-into-html-with-vite](https://github.com/CallumBoase/plasmic-codegen-into-html-with-vite).

# Changelog
### 1.0.0 (24 April 2025)
* Remove unecessary console.log
* Update package.json to contain version and name
* Update readme for how to import into your HTML - using cdn.jsdelivr instead of deployed Netlify project (which allows specifying a version too)

# How to use?
1. Load `https://cdn.jsdelivr.net/gh/CallumBoase/render-plasmic-into-html@1.0.0/public/customComponents.js` into your html (eg via a script tag in `<head>`)
    * Note the version after @ in the URL. You can load any published version (see Tags in the github of this project)
2. In your html add a div with an id eg `<div id="exampleTarget"></div>`
3. Render the component into your HTML using javascript somewhere on the page. 

```js

window.customComponents.render.plasmicComponent({
  //The ID of your div to render Plasmic inside
  targetDiv: 'exampleTarget',
  //Decide if you want to render into a ShadowDOM (to isolate Plamic from external styles on your page)
  useShadowDOM: false,
  //Your plasmic project token obtained from the plasmic studio URL
  projectId: 'XXXX',
  //Your plasmic project's public token obtained from plasmic studio -> Code button
  publicToken: 'XXXX',
  //true/false whether or not to render the latest changes (even if not published yet)
  preview: false,
  //The name of your plasmic component to render
  component: 'SomePlasmicComponent',
  //Any props to pass into your component 
  componentProps: {}//Props to pass to the component or page
});

//Docs here: https://docs.plasmic.app/learn/react-api/

```

# Legacy info for how to load `render-plasmic-into-html` into your project

This method is NO LONGER RECOMMENDED!

As of version 1.0.0 on 24 April 2025, we no longer recommend importing the package using the method below due to issues with version control.

Version 1.0.0 of this repo is deployed to Netlify via the below method, however new version will no longer be deployed to Netlify. This ensure stability of version 1.0.0 for legacy users but discouarges future use.

# Deployment info (legacy not recommended)
The public folder of this repo, version 1.0.0 is deployed to https://render-plasmic-into-html.netlify.app/
(owner of project: Callum Boase)

