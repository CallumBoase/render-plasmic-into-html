//Simulate the Knack window object
//So we can run test locally not in Knack
//You can add anything you need in here, these are just examples

window.Knack = {
    getUserToken: () => {
        return 'INSERT A USER TOKEN HERE copy-pasted from the results of Knack.getUserToken() in a real app'
    },
    showSpinner: () => {console.log('showSpinner')},
    hideSpinner: () => {console.log('hideSpinner')},
    fields: {
        field_30: {
            attributes: {
                type: 'multiple_choice',
                format: {
                    options: ['a', 'b', 'c']
                }
            }
        }
    }
}