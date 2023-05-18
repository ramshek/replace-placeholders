const fs = require('fs');

async function run() {
  try {
    const placeholders = process.env.INPUT_PLACEHOLDERS;
    const files = process.env.INPUT_FILES;

    const placeholderPairs = placeholders.split('\n').filter((placeholder) => placeholder.trim() !== '');
    const filePaths = files.split('\n').filter((file) => file.trim() !== '');

    for (const filePath of filePaths) {
      console.log(`Replacing placeholders in ${filePath}`);

      let fileContent = fs.readFileSync(filePath, 'utf8');
      
      for (const placeholderPair of placeholderPairs) {
        const [key, value] = placeholderPair.split('=');
        const regex = new RegExp(`\\\$${key}`, 'g');
        fileContent = fileContent.replace(regex, value);
      }

      fs.writeFileSync(filePath, fileContent);
    }

    console.log('Placeholders replaced successfully');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

run();
