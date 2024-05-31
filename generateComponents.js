const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');
const models = fs.readdirSync(modelsDir)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file !== 'init-models.js')
    .map(file => file.replace('.js', ''));

models.forEach((model) => {
    exec(`npx plop ${model} --plopfile plopfile.js`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error generating component for ${model}:`, error);
            return;
        }
        console.log(`Component for ${model} generated successfully.`);
        console.log(stdout);
        console.error(stderr);
    });
});