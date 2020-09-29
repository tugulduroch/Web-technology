/**
 * Cs142TemplateProcessor - A template processor class.
 * @param       {string} template - The template to be processed.
 * @constructor
 */
function Cs142TemplateProcessor(template) {
    this.template = template;
}

/**
 * fillIn - Replace template properties in the template string
 * with their respective values.
 * @param  {object} dictionary - Object containing property names
 * and their values.
 * @return {string}            - The template string, processed.
 */
Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
    var template = this.template;

    // Match the properties in the template string with regex
    var props = template.match(/{{([^{}]*)}}/g);
    var propName;

    for (var i = 0; i < props.length; i++) {
        // Extract property name: '{{property}}' => 'property'
        propName = props[i].slice(2, -2);

        if (propName in dictionary) {
            template = template.replace(props[i], dictionary[propName]);
        } else {
            template = template.replace(props[i], '');
        }
    }

    return template;
};
