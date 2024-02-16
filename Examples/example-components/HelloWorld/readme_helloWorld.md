# How to use the HelloWorld component example
This is a very basic component. It's just to demonstrate the most basic method of importing a component from an external file.

1. Go to `customComponents_dev.js`. Import HelloWorld.js and render it in the helloWorld function. Your file should look like this when you're done.
    ```js
    //Import react and react-dom
    import React from 'react';
    import ReactDOM from 'react-dom';

    //Import your external helloWorld component
    import HelloWorld from './Examples/example-components/HelloWorld/HelloWorld.js';

    //Declaring our customComponents variable which will be set to the window object at the end
    const customComponents = {render: {}}

    //Declaring functions that can be called to render our components
    customComponents.render.helloWorld = function helloWorld(settings = { targetDiv }) {
    ReactDOM.render(
        <HelloWorld />,
        document.getElementById(settings.targetDiv)
    );
    }

    //Adding the customComponents object to the browser window object when this file is run
    window.customComponents = customComponents;
    ```

2. Go to `localTesting/index.html`. Create a div for your helloWorld component, and render helloWorld from the window object. Your HTML should look like this when you're done.
    ```html
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <title>Hello World with React</title>
            <!-- <script src="knackWindow.js"></script> -->
            <script src="../public/customComponents.js"></script>
            
        </head>
        <body>
            <div id="helloWorld"></div>
            <script>
            window.customComponents.render.helloWorld({targetDiv: 'helloWorld'});
            </script>
        </body>
    </html>
    ```

3. In a terminal, run `npm run build` to compile your components into a single, browser-friendly file.

4. Open `./localTesting/index.html` in a browser. You should now see hello world rendered on the page from your custom component.