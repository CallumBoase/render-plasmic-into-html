# Local testing instructions
It's convenient to test components we are developing locally, rather than deploying them to Netlify, waiting for build to happen, and then testing them directly in the final website (eg the Knack app).

The files in this folder facilitate that.

## Compiling for testing
* Normally, we compile our components into a single browser-friendly file (`./dist/customComponents.js`) by running in terminal `npm run build`. However, this does not make it easy to trace where errors originate, if they occur.
* Therefore, when we want to test locally, we should instead run `npm run devBuild`. This still creates a single browser-friendly javascript file (`./dist/customComponents.js`) however it is compiled in a different (and much less compact) way that allows easier tracing of errors in the stack.

## Testing basic components

`index.html` contains boilerplate HTML required to locally test components compiled as above.

In `index.html` we do these things to import and run our components:
* We import ./dist/customComponents.js at the top which loads the customComponents into the window object as window.customComponents
```html
    <script src="dist/customComponents.js"></script>
```
* In the body of the html document, we create divs and then use script tags to initialise the custom components into those divs
```html
    <div id="helloWorld"></div>
    <script>
        window.customComponents.render.helloWorld({targetDiv: 'helloWorld'})
    </script>
```
## Local testing when the window.Knack object is involved

The above instructions work well for simple components that could render in any html environment. 

However, when we are developing custom components for Knack apps, we may sometimes reference the `window.Knack` object (eg `Knack.getUserToken()` to authenticate an API call or `Knack.showSpinner()` to show the Knack spinner). 

In thise case, we we need to do a little more work to enable local testing in `index.html`

The file called `knackWindow.js` creates a fake `window.Knack` object in our local html file. We manually create our object in this file (just by typing what we need) to mimick the structure and data of `window.Knack` object in our Knack app. This allows us to simulate running our component in Knack, but locally.

This seems inconvenient, but we usually just need a few key parts of `window.Knack` so it's not that cumbersome.

Eg, the below configuration of `knackWindow.js` simulates the method `window.Knack.getUserToken()`. 

To create the below code in `knackWindow.js` we just examined the `window.Knack` object in a real Knack app to decide what structure we needed to create locally. We also logged into our Knack app front-end (as the correct user type) and ran the method `Knack.getUserToken()` to get a valid user token to return from our fake `getUserToken()` function.
```js
window.Knack = {
    getUserToken: () => {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyZGZmZTk4OTE1MTcwMDI2NmFiNDNiIiwiYXBwbGljYXRpb25faWQiOiI2NDJkMjY4OTEwODU2NzAwMjdhMTcxNTciLCJpYXQiOjE2ODEzNjA3MjR9.ZEgbSx456i9YgGKktv-xyb-Ydn-MCVsDUCOBvPCCXWM'
    },
}
```
Now, we can authenticate our API calls using `window.Knack.getUserToken()` when testing locally, and don't need to do all our testing directly in Knack.

## Summary
To test locally:
1. Develop your components as required, including adding them to `./customComponents_dev.js` like normal.
2. In terminal run `npm run devBuild` and wait for it to finish
3. Initialise your component in `index.html` in the normal way
    * Optional: if using the `window.Knack` object in your component, add the required values to `knackWindow.js`
4. Save `index.html` and `knackWindow.js` 
5. Open index.html in your browser (no need to run a server - just double click the html file to run "vanilla" in your browser) and see the result. Open console to see any errors.
