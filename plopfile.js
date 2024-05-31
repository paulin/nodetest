const { camelCase, pascalCase, lowerCase } = require('change-case');

module.exports = function (plop) {
    const models = [
        'Customer',
        'CustomerEmailDomain',
        'CustomersBuyboxRegion',
        'CustomersEin',
        'Deal',
        'DealsListing',
        'Listing',
        'ListingProperty',
        'Market',
        'Property',
        'PropertyEvent',
        'PropertyPhoto',
        'PropertySnapshot',
        'Setting',
        'User'
    ];

    plop.setHelper('pascalCase', (text) => {
        console.log(`Converting ${text} to PascalCase: ${pascalCase(text)}`);
        return pascalCase(text);
    });
    plop.setHelper('lowerCase', (text) => {
        console.log(`Converting ${text} to LowerCase: ${lowerCase(text)}`);
        return lowerCase(text);
    });

    models.forEach((model) => {
        plop.setGenerator(model, {
            description: `generate a CRUD React component for ${model} Matt`,
            prompts: [],
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