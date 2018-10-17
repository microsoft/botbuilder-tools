const cp = require('child_process');
const p = require('./package.json');
cp.exec('dotnet tool -h', (error, out, err) => {
  if (error) {
    console.log('This tool requires the Dotnet SDK 2.1 to be installed. Go to https://www.microsoft.com/net/download to install.' );
    console.log('NOTE: You do not need to use npm to install this tool once you have the Dotnet SDK 2.1 installed. '); 
    console.log('To install run:');
    console.log('    '+p.scripts.install); 
    console.log('To uninstall run:');
    console.log('    '+p.scripts.uninstall); 
  }

 });

