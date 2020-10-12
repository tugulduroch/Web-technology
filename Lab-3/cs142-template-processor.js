function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function (dictionary) {
    var template = this.template;

    var props = template.match(/{{([^{}]*)}}/g);
    var propName;

    for (var i = 0; i < props.length; i++) {
        propName = props[i].slice(2, -2);

        if (propName in dictionary) {
            template = template.replace(props[i], dictionary[propName]);
        } else {
            template = template.replace(props[i], '');
        }
    }

    return template;
};