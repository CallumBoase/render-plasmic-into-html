# render-plasmic-into-html
Render a plasmic component or page into a HTML page using a custom function powered by react code. This is more functional and flexible than using Plasmic's render API.

# Deployment info
The public folder of this repo is deployed to https://render-plasmic-into-html.netlify.app/
(owner of project: Callum Boase)

# How to use?
1. Load https://render-plasmic-into-html.netlify.app/customComponents.js into your html
2. Render the component like this
```js

window.customComponents.render.plasmicComponent({
  targetDiv: 'some-id-of-a-div-on-the-page',
  projectId: 'XXXX',//Your plasmic project token
  publicToken: 'XXXX',//Your plasmic project's public token
  preview: false,
  component: 'SomePlasmicComponent',
  componentProps: {}//Props to pass to the component or page
});

```

# Publishing updates
1. Make the changes
2. Run `npm run build`
3. Commit the changes & push to main branch
4. Netlify will automatically deploy the changes

