# How to use the example component: Multi File Uploader

1. Create a Knack app
    * User logins enabled
    * Add 2 objects:
        * Members
            * Contains 1 field: "Name"
        * File Uploads
            * Contains 4 fields:
                * File: a file upload field
                * Category: a multi-choice field (NOT a connection field). Single-select.
                    * Add some multi-choice options to the category field (these will automatically appear as options in the Multi File Uploader component)
                * Descriptin: a text field
                * Member: a connection field. Each file upload connects with 1 member. Each member connects with many file uploads
    * Add a few members to your Members object
    * A page with a couple of views to serve as the data source for view-based API calls
        * The page should be login-protected, limited to the user role/s you want to let use the multi file uploader component
        * Views required:
            * An `Add file upload` form. A form that creates a new `File upload` record, containing the 4 fields in the `File uploads` object
            * A `Members` grid, showing all the member records that should appear as options when creating file uploads, and containing the `Name` field in the `Member` object


2. Back in this repo, make sure your package.json has these dependencies listed at minimum

```js
    {
        "dependencies": {
            "@emotion/react": "^11.10.6",
            "@emotion/styled": "^11.10.6",
            "@mui/icons-material": "^5.11.16",
            "@mui/material": "^5.12.0",
            "axios": "^1.3.5",
            "knack-api-helper": "^2.1.4",
            "react": "^18.2.0",
            "react-dom": "^18.2.0"
        },
    }

```

3. In a terminal, run `npm install` to install any missing dependencies

4. Open `./Examples/example-components/MultiFileUploader/globals.js` and adjust values as indicated, corresponding with the Knack app created in step 1.

5. Open `./localTesting/knackWindow.js` 
    * Paste a valid user token from your app inside the `getuserToken: () => {` function (see `./localTesting/readme_localTesting.md` for info). The user token should authenticate a user of the correct user roles for your API call data source views set up in step 1. 
    * Add some meta-data for your category field in the `File Uploads` object in your Knack app (simulating the field configuration that `Knack.window` would contain in your Knack app)
    * When you're done, your `knackWindow.js` should look like this (substituting correct values in line 7 and 12)
    ```js
    //Simulate the Knack window object
    //So we can run test locally not in Knack
    //You can add anything you need in here, these are just examples

    window.Knack = {
        getUserToken: () => {
            return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyZGZmZTk4OTE1MTcwMDI2NmFiNDNiIiwiYXBwbGljYXRpb25faWQiOiI2NDJkMjY4OTEwODU2NzAwMjdhMTcxNTciLCJpYXQiOjE2ODE3MDc2MDd9.21XHHJDi-HiMdWfutpp3jZyAHU7Wqr_vOr0XN4h3L0A'
        },
        showSpinner: () => {console.log('showSpinner')},
        hideSpinner: () => {console.log('hideSpinner')},
        fields: {
            field_30: {//Change this to the field_key of your category field in the fileUploads object
                attributes: {
                    type: 'multiple_choice',
                    format: {
                        options: ['a', 'b', 'c']
                    }
                }
            }
        }
    }
    ```

6. Go to `./localTesting/index.html` and un-comment the `knackWindow.js` script. Also, add a div for your Multi File Uploader component to render in, and a script tag to render it. Your html should look like this when it's finished.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World with React</title>
    <script src="knackWindow.js"></script>
    <script src="../public/customComponents.js"></script>
    
  </head>
  <body>
    <div id="MultiFileUploader"></div>
    <script>
      window.customComponents.render.multiFileUploader({targetDiv: 'MultiFileUploader'});
    </script>
    <!-- create div and render component into it here -->
  </body>
</html>
```

7. Go to `customComponents_dev.js`. Import the multi file uploader component, and add it to the window. the file should look like this when you're done
```js
//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';
import MultiFileUploader from './Examples/example-components/MultiFileUploader/MultiFileUploader.js';

//Declaring our customComponents variable which will be set to the window object at the end
const customComponents = {render: {}}

//Declaring functions that can be called to render our components
customComponents.render.multiFileUploader = function multiFileUploader(settings = { targetDiv }) {
  ReactDOM.render(
    <MultiFileUploader />,
    document.getElementById(settings.targetDiv)
  );
}

//Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;
```

8. In a terminal, run `npm run build` and wait until it's done

9. Open `./localTesting/index.html` in your browser. You should hopefully see the Multi File Uploader component set up and working. If you need to troubleshoot, run `npm run devBuild` instead, to get more useful error messages and find the problem.

10. Once your component is working locally, you can server the compiled `customComponents.js` script somewhere on the web, and render it in your Knack app, as per normal instructions.