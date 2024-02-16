//Globals for the example component MultiFileUploader
//You'd need to configure this for your own Knack app to use the component
//For instructions on how to configure your Knack app see ./Examples/example-components/MultiFileUploader/readme_multiFileUploader.md

const globals = {
    Knack: {
        
        //Set to your Knack application ID
        applicationId: '642d26891085670027a17157',
        
        objects: {

            fileUploads: {
                //Set to the field_ids in your fileUploads Knack object (for fields: file, category, description and member)
                fields: {
                    file: 'field_29',
                    category: 'field_30',
                    description: 'field_31',
                    member: 'field_33'
                },
                //Set to the scene and view_key pair containing the "Add file upload" form (for API calls to use)
                addFileUploadForm: {
                    scene: 'scene_55',
                    view: 'view_78'
                }
            },
            //Set to the field_id in your members Knack object (for field: Name)
            members: {
                fields: {
                    memberName: 'field_32'
                },
                gridOfMembers: {
                    //Set to the scene and view_key pair containing the "Grid of members" view (for API calls to use)
                    scene: 'scene_55',
                    view: 'view_82'
                }
            }
        }
    }
}

export default globals;