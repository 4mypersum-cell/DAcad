const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ Created data directory');
}

// Create students.json if it doesn't exist
const studentsFile = path.join(dataDir, 'students.json');
if (!fs.existsSync(studentsFile)) {
  fs.writeFileSync(studentsFile, JSON.stringify({ students: {} }, null, 2));
  console.log('✅ Created students.json file');
}

console.log('\n🎉 Setup complete! You can now run: npm run dev\n');


