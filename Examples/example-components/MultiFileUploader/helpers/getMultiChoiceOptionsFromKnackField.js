export default function getMultiChoiceOptionsFromKnackField(fieldId){
    const field = window.Knack.fields[fieldId];
    const isMultiChoice = field.attributes.type === 'multiple_choice';
    if(!isMultiChoice) return [];
    const options = field.attributes.format.options;
    return options;
}