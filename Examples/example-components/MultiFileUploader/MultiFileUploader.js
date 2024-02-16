//Import react
import React, { useState, useEffect } from 'react';

//Import the components defined in other files
import EditableTable from './components/EditableTable.js';
import SubmitButton from './components/SubmitButton.js';
import SuccessBanner from './components/SuccessBanner.js';
import ErrorBanner from './components/ErrorBanner.js';

//Import some helper functions related to API calls
import { getMemberOptions } from './helpers/apiCalls.js';
import getMultiChoiceOptionsFromKnackField from './helpers/getMultiChoiceOptionsFromKnackField.js';
import { uploadFilesThenCreateFileUploadRecords } from './helpers/uploadFilesThenCreateFileUploadRecords.js';

//Import MUI theme and styles
import theme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';

//Import some global info
import globals from './globals.js';

//Shortcut to global variables
const knackFileUploadsObjectFields = globals.Knack.objects.fileUploads.fields;

//Define our editable columns
//  These will be used to create the table - 1 row per uploaded file.
//  PARAMETERS
// - label: is the column header on the page
// - key: is the key used to refer to the column throughout the component logic. 
//    -Must be unique
//    -Must not use the string "file" because that is a reserved key for the actual file uploaded
// - type: is the type of input to use for the column
//    Type options:
//    - readOnly will display non-editable text, defined by the parameter value
//    - select will display a dropdown menu with the options provided by the dropdownOptions function or array
//    - text will display a text input
// - dropdownOptions: is a function or array of options to use for the dropdown menu
//    -If the column type is select, the dropdownOptions must be provided
//    -The dropdown options function must return an array of strings or objects {id: string, identifier: string}
//    -A hard-coded array can be an array of strings or objects {id: string, identifier: string}
// - value: is the starting value of the column
//    -You can also pass a special string 'file.name' to prefill the value as the uploaded file name and extension
// - mandatory: is a boolean that determines whether the column needs a value before submitting uploads
const columns = [
  { label: 'File', key: 'fileName', type: 'readOnly', value: 'file.name', mandatory: false },
  { label: 'New file name', key: 'newFileName', type: 'text', mandatory: false },
  { label: 'Category', key: 'category', type: 'select', dropdownOptions: fetchCategories, mandatory: true },
  { label: 'Member', key: 'member', type: 'select', dropdownOptions: getMemberOptions, mandatory: true },
  { label: 'Description', key: 'description', type: 'text', mandatory: false }
]

//Define our component
const FileUploader = () => {

  //Defining state variables
  //Each time a state variable changes, the virtual DOM will re-render
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  //Create a useEffect hook for each column with a dropdown
  //This will set the dropdown options of each dropdown
  columns.filter(column => column.type === 'select').forEach(column => {
    useEffect(() => {
      configDropdownOptions(column, setDropdownOptions);
    }, [])
  });

  //When the file input changes, we create a record object for each file, with starting values for each column
  const handleFileInputChange = (event) => {

    setRecords(Array.from(event.target.files).map((file) => {

      //We always include the uploaded file under key 'file'
      let record = { file: file };

      //For each column, we need to set the value of the corresponding key
      columns.forEach((column) => {

        //Special case: value is file.name, then set it to file name
        if (column.value === 'file.name') {
          record[column.key] = file.name;
        } else {
          record[column.key] = column.value || '';
        }

      });

      return record;

    }));
  };

  //When the user clicks the remove button on a row, we need to update the files and records variables
  const handleRemoveRow = (index) => {
    setRecords((prevRecords) => removeNthItemFromArray(prevRecords, index));
  };

  //When a value in the editable table changes, update the records variable with new data
  const handleValueChange = (index, column, value) => {
    setRecords((prevRecords) => {
      const newRecords = prevRecords.map((record, i) =>
        i === index ? { ...record, [column]: value } : record
      );
      return newRecords;
    });
  };

  //When a user clicks the submit button, we run API calls to upload the files and create the records
  //Depending on the result of this, we update the submitStatus variable to 'success' or 'error'
  //We also reset the files state variable to an empty array, which hides the table.
  const handleSubmit = async () => {
    setIsLoading(true);
    Knack.showSpinner();
    const results = await uploadFilesThenCreateFileUploadRecords(records);
    if (results.failed === 0) {
      setSubmitStatus('success');
    } else {
      setSubmitStatus('error');
    }
    setIsLoading(false);
    Knack.hideSpinner();
    setRecords([]);
  };

  //When the user clicks a button that runs handleReset
  //We reset the values needed to re-render the virtual DOM in it's starting state
  //This means the table and banners are gone, and the file input is visible again
  const handleReset = () => {
    setRecords([]);
    setSubmitStatus(null);
  };

  //Define the props object that will be passed to the component
  const props = {
    columns,
    dropdownOptions,
    records,
    handleRemoveRow,
    handleValueChange,
    handleSubmit,
    handleReset,
    isLoading,
    submitStatus,
  }

  //Some variables to help deciding what to render
  //These will recalculate every time the component re-renders
  
  const allMandatoryFieldsFilled = records.every((record) => {
    const filled = columns.filter(column => column.mandatory).every((column) => {
      return record[column.key] !== '';
    });
    return filled;
  });
  
  const showFileInput = records.length === 0 && submitStatus === null;

  //The actual component JSX that gets rendered
  return (
    <ThemeProvider theme={theme}>
      <>
        {showFileInput && (
          <input type="file" multiple onChange={handleFileInputChange} />
        )}
        {records.length > 0 && (
          <>
            <EditableTable
              props={props}
            />
            <SubmitButton isDisabled={!allMandatoryFieldsFilled || isLoading} onClick={handleSubmit} />
          </>
        )}
        {submitStatus === 'success' && (
          <SuccessBanner handleReset={handleReset} />
        )}
        {submitStatus === 'error' && (
          <ErrorBanner handleReset={handleReset} />
        )}
      </>
    </ThemeProvider>
  );
};

//Export out component
export default FileUploader;


//Helper function to fetch categories
async function fetchCategories() {
  return await getMultiChoiceOptionsFromKnackField(knackFileUploadsObjectFields.category);
}

//Helper function to format a dropdown options as {id: 'string', identifier: 'string'}
function formatDropdownOptions(options) {

  let optionsFormatted;

  //Format the options into {id: 'string', identifier: 'string'} objects when possible
  if (options.length && options[0].id && options[0].identifier) {
    //Nothing required - it's already formatted correctly
    optionsFormatted = options;
  } else if (options.length && typeof options[0] === 'string') {
    //Set ID and identifier to the same value
    optionsFormatted = options.map(option => ({ id: option, identifier: option }));
  } else {
    //Unknown format - throw an error
    throw new Error('dropdownOptions must be an array of strings or an array of objects with id and identifier properties');
  }

  return optionsFormatted;

}

  //Helper function to remove an item from an array
  //This is used to dynamically create useEffect hooks in the component
  function removeNthItemFromArray(array, index) {
    return array.filter((_, i) => i !== index);
  }

  //Helper function to configure dropdown options
  function configDropdownOptions(column, setDropdownOptions) {

    if (Array.isArray(column.dropdownOptions)) {
      const optionsFormatted = formatDropdownOptions(column.dropdownOptions);
      setDropdownOptions((prevDropdownOptions) => ({ ...prevDropdownOptions, [column.key]: optionsFormatted }));
  
    } else if (typeof column.dropdownOptions === 'function') {
      const fetchOptions = async () => {
        const options = await column.dropdownOptions();
        const optionsFormatted = formatDropdownOptions(options);
        setDropdownOptions((prevDropdownOptions) => ({ ...prevDropdownOptions, [column.key]: optionsFormatted }));
      };
      fetchOptions();
  
    }
  
  }