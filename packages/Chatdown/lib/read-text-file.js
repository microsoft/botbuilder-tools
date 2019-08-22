const fs = require('fs');

const readTextFile = {
    readSync: function(file){
        try {
            let fileBuffer = fs.readFileSync(file);
            if(fileBuffer) {
                // If the data starts with BOM, we know it is UTF
                if( fileBuffer[0] === 0xEF && fileBuffer[1] === 0xBB && fileBuffer[2] === 0xBF) {
                    // EF BB BF  UTF-8 with BOM
                    fileBuffer = fileBuffer.slice(3);
                } else if(fileBuffer[0] === 0xFF && fileBuffer[1] === 0xFE && fileBuffer[2] === 0x00  && fileBuffer[3] === 0x00) {
                    // FF FE 00 00  UTF-32, little-endian BOM
                    fileBuffer = fileBuffer.slice(4);
                } else if(fileBuffer[0] === 0x00 && fileBuffer[1] === 0x00 && fileBuffer[2] === 0xFE  && fileBuffer[3] === 0xFF) {
                    // 00 00 FE FF  UTF-32, big-endian BOM
                    fileBuffer = fileBuffer.slice(4);
                } else if(fileBuffer[0] === 0xFE && fileBuffer[1] === 0xFF && fileBuffer[2] === 0x00  && fileBuffer[3] === 0x00) {
                    // FE FF 00 00  UCS-4, unusual octet order BOM (3412)
                    fileBuffer = fileBuffer.slice(4);
                } else if(fileBuffer[0] === 0x00 && fileBuffer[1] === 0x00 && fileBuffer[2] === 0xFF  && fileBuffer[3] === 0xFE) {
                    // 00 00 FF FE  UCS-4, unusual octet order BOM (2143)
                    fileBuffer = fileBuffer.slice(4);
                } else if(fileBuffer[0] === 0xFF && fileBuffer[1] === 0xFE) {
                    // FF FE  UTF-16, little endian BOM
                    fileBuffer = fileBuffer.slice(2);
                } else if(fileBuffer[0] === 0xFE && fileBuffer[1] === 0xFF) {
                    // FE FF  UTF-16, big endian BOM
                    fileBuffer = fileBuffer.slice(2);
                }
            }
        
            return fileBuffer.toString('utf8').replace(/\0/g, '');
        } catch(err) {
            if (err.message.match(/ENOENT: no such file or directory/)) {
                throw err;
            } 
            throw (new Error('Invalid Input', `Sorry, unable to parse file: \n\n ${JSON.stringify(err, null, 2)}\n\n`));
        }
    }
}

module.exports = readTextFile;

