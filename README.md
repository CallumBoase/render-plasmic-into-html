# render-plasmic-into-html
Render a plasmic component or page into a HTML page using the react API, instead of the normal Render API. This is more functional and flexible than using Plasmic's render API.

Plasmic react-api docs: https://docs.plasmic.app/learn/react-api/

Important note: this repo ONLY supports components that are natively available in Plasmic. It will NOT render Plasmic components that contain custom code components that you registered in Plasmic studio. If you need this functionality, see the more complex but powerful option: [Plasmic-codegen-into-html-with-vite](https://github.com/CallumBoase/plasmic-codegen-into-html-with-vite).

# Deployment info
The public folder of this repo is deployed to https://render-plasmic-into-html.netlify.app/
(owner of project: Callum Boase)

# How to use?
1. Load https://render-plasmic-into-html.netlify.app/customComponents.js into your html (eg via a script tag in `<head>`)
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

# Publishing updates
1. Make the changes
2. Run `npm run build`
3. Commit the changes & push to main branch
4. Netlify will automatically deploy the changes

