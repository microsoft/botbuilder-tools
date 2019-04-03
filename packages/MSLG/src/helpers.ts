import * as path from 'path';
import * as fs from 'fs-extra';

export class helpers {
    public static findLGFiles(inputFolder: string, getSubFolders: boolean): any[] {
        let results: any[] = [];
        const luExt = '.lg';
        fs.readdirSync(inputFolder).forEach(function (dirContent) {
            dirContent = path.resolve(inputFolder, dirContent);
            if (getSubFolders && fs.statSync(dirContent).isDirectory()) {
                results = results.concat(helpers.findLGFiles(dirContent, getSubFolders));
            }
            if (fs.statSync(dirContent).isFile()) {
                if (dirContent.endsWith(luExt)) {
                    results.push(dirContent);
                }
            }
        });

        return results;
    }
}