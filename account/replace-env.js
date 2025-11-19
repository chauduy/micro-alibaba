// replace-env.js
const fs = require('fs');
const envFilePath = 'src/environments/environment.prod.ts';
let envContent = fs.readFileSync(envFilePath, 'utf8');

Object.keys(process.env).forEach((key) => {
    const placeholder = `__${key}__`;
    if (envContent.includes(placeholder)) {
        envContent = envContent.replaceAll(placeholder, process.env[key]);
    }
});
console.log('process', process.env);
console.log('envContent', envContent);
console.log('envFilePath', envFilePath);

fs.writeFileSync(envFilePath, envContent);
console.log('Environment variables replaced');
