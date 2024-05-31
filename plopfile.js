const fs = require('fs');
const path = require('path');
const { pascalCase, camelCase } = require('change-case');

module.exports = function (plop) {
    const modelsDir = path.join(__dirname, 'models');
    const models = fs.readdirSync(modelsDir)
        .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'init-models.js')
        .map(file => file.replace('.js', ''));

    console.log('Detected models:', models); // Debugging line

    plop.setHelper('pascalCase', (text) => {
        console.log(`pascalCase helper called with text: ${text}`); // Debugging line
        return pascalCase(text);
    });

    plop.setHelper('camelCase', (text) => {
        console.log(`camelCase helper called with text: ${text}`); // Debugging line
        return camelCase(text);
    });

    models.forEach((model) => {
        console.log('Setting up generator for model:', model); // Debugging line
        plop.setGenerator(model, {
            description: `generate a CRUD React component for ${model}`,
            prompts: [
                {
                    type: 'input',
                    name: 'name',
                    message: 'Model name?',
                    default: model
                }
            ],
            actions: [
                {
                    type: 'add',
                    path: `client/src/components/{{pascalCase name}}.js`,
                    templateFile: 'plop-templates/Component.js.hbs',
                },
            ],
        });
    });
};