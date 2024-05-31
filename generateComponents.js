const { exec } = require('child_process');

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

models.forEach((model) => {
    exec(`npx plop --plopfile plopfile.js ${model}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating component for ${model}:`, error);
            return;
        }
        console.log(`Component for ${model} generated successfully.`);
        console.log(stdout);
        console.error(stderr);
    });
});