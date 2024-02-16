//Import react and react-dom
import React from 'react';
import ReactDOM from 'react-dom';

//Declaring our customComponents variable which will be set to the window object at the end
const customComponents = {render: {}}

//Declaring functions that can be called to render our components
customComponents.render.helloWorld = function helloWorld(settings = { targetDiv }) {
  ReactDOM.render(
    //JSX code goes here,
    document.getElementById(settings.targetDiv)
  );
}

//Adding the customComponents object to the browser window object when this file is run
window.customComponents = customComponents;