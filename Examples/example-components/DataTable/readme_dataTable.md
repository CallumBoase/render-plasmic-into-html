# How to use the DataTable component example
This is a more complex component, rendering a table of records from an API call to a public page in a Knack app. You could replace the API call to the Knack app with a call to any other API too.

1. Go to `package.json` and make your dependencies section say have all these itmes
    ```js
    "dependencies": {
        "@emotion/react": "^11.10.6",
        "@emotion/styled": "^11.10.6",
        "@mui/icons-material": "^5.11.16",
        "@mui/material": "^5.12.0",
        "knack-api-helper": "^2.1.4",
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
    },
    ```
2. In a terminal, run `npm install` to install any dependencies that are missing

3. Go to `./Examples/example-components/DataTable/DataTable.js`. Modify the values at the top (line 1-14) to suit a Knack app you own.
    * applicationId should the the Knack application to get records from
    * apiCall.scene and apiCall.view should be a public scene with a grid view on it showing the records you want to render in your DataTable component. This will be what the view-based API call will use to get records from Knack.
    * nameField should be the field_key (eg field_23) of a field that is included in the apiCall.view (the grid view). The field you want to show in the "name" column of the example Data table component.
    * infoField should be another field_key (eg field_24) of a field that is included in the apiCall.view, and which you want to use as the "Info" column of the example Data table component.

4. Go to `customComponents_dev.js`. Import the DataTable and create a render function. Your file should look like this when you're done.
    ```js
    //Import react and react-dom
    import React from 'react';
    import ReactDOM from 'react-dom';

    //Import DataTable component
    import DataTable from './Examples/example-components/DataTable/DataTable.js';

    //Declaring our customComponents variable which will be set to the window object at the end
    const customComponents = {render: {}}

    //Declaring functions that can be called to render our components
    customComponents.render.dataTable = function dataTable(settings = { targetDiv }) {
        ReactDOM.render(
            <DataTable />,
            document.getElementById(settings.targetDiv)
        );
    }

    //Adding the customComponents object to the browser window object when this file is run
    window.customComponents = customComponents;
    ```

5. Go to `localTesting/index.html`. Create a div for your dataTable component, and render datatable from the window object. Your HTML should look like this when you're done.
    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <title>Hello World with React</title>
            <!-- <script src="knackWindow.js"></script> -->
            <script src="../public/customComponents.js"></script>
            <div id="dataTable"></div>
            <script>
                window.customComponents.render.dataTable({targetDiv: "dataTable"});
            </script>
        </head>
        <body>
            <!-- create div and render component into it here -->
        </body>
    </html>
    ```

6. In a terminal, run `npm run build` to compile your component into a single, browser-friendly file.

7. Open `./localTesting/index.html` in a browser. You should now see the data table loaded on the page, showing your Knack records and 2 columns.