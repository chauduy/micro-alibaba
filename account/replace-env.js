const fs = require('fs');

const filePath = 'src/environments/environment.prod.ts';
let fileContent = fs.readFileSync(filePath, 'utf8');

// Find all placeholders in the file, like __SOME_KEY__
const regex = /__([A-Z0-9_]+)__/g;

fileContent = fileContent.replace(regex, (match, p1) => {
    const value = process.env[p1];
    if (!value) {
        console.warn(`⚠️ Warning: Environment variable ${p1} is missing in Vercel.`);
        return match; // leave placeholder unchanged
    }
    return value;
});

fs.writeFileSync(filePath, fileContent);

console.log('✅ environment.prod.ts variables replaced.');
