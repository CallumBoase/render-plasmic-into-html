//Load your component code so it's available in the window object.
//KnackInitAsync blocks the app loading until callback() is run 
//See https://docs.knack.com/docs/load-external-javascript-files
//Prevents the app loading until you run callback()
KnackInitAsync = function($, callback) {

    // REQUIRED: Explicitly include jQuery
    window.$ = $;

    const scripts = [
        {src: 'https://extraordinary-khapse-4c4e7c.netlify.app/customComponents.js'}
    ]
    loadScripts(scripts, callback, () => {console.log('error loading scripts')});
}

//Adding our component after view_79, when view_79 renders
$(document).on('knack-view-render.view_79', function(event, view){
    $(`<div style="width:100%" id='helloWorld'></div>`).insertAfter(`#${view.key}`);
    window.customComponents.render.helloWorld({targetDiv: 'helloWorld'})
})

//Helper function to load scripts into a Knack app
const loadScripts = (scripts, onSuccess, onFailure) => {
    let loadedScripts = 0;
    let failedScripts = 0;

    if(typeof onSuccess !== 'function'){
        onSuccess = function(){
            console.log('Scripts loaded');
        }
    }

    if(typeof onFailure !== 'function'){
        onFailure = function(){
            console.error('Failed to load scripts');
        }
    }

    scripts.forEach(({ src, type }) => {
        const script = document.createElement('script');
        script.src = src;
        if (type) {
            script.type = type;
        }

        script.addEventListener('load', () => {
            loadedScripts++;
            if (loadedScripts === scripts.length) {
                onSuccess();
            }
        });

        script.addEventListener('error', () => {
            failedScripts++;
            onFailure();
        });

        document.body.appendChild(script);
    });
};

