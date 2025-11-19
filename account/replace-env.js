const fs = require('fs');

const envFilePath = 'src/environments/environment.prod.ts';
let envContent = fs.readFileSync(envFilePath, 'utf8');

const replacements = {
    __API_KEY__: process.env.API_KEY,
    __AUTH_DOMAIN__: process.env.AUTH_DOMAIN,
    __PROJECT_ID__: process.env.PROJECT_ID,
    __STORAGE_BUCKET__: process.env.STORAGE_BUCKET,
    __MESSAGING_SENDER_ID__: process.env.MESSAGING_SENDER_ID,
    __APP_ID__: process.env.APP_ID,
    __MEASUREMENT_ID__: process.env.MEASUREMENT_ID,
};

Object.entries(replacements).forEach(([placeholder, value]) => {
    if (value && envContent.includes(placeholder)) {
        envContent = envContent.replaceAll(placeholder, value);
    }
});

fs.writeFileSync(envFilePath, envContent);
