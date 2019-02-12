import * as latestVersion from 'latest-version';
import * as semver from 'semver';
import * as pacakgeJson from '../package.json';
import * as ludown from './commands/ludown';
import * as printers from './utils/printers';

latestVersion(pacakgeJson.name, { version: `>${pacakgeJson.version}` })
    .catch(() => pacakgeJson.version)
    .then(resolvedLatestVersion => {
        if (semver.gt(resolvedLatestVersion, pacakgeJson.version)) {
            printUpdateMessage(pacakgeJson.version, resolvedLatestVersion, pacakgeJson.name);
        }

        ludown.init();
    });

/**
 * @description
 * Prints a message that informs the user that a newer version of the command
 * line is available.
 *
 * @param oldVersion The current version that the user has installed.
 * @param newVersion The newer version that is potentially installable.
 * @param packageName The package name of the current library.
 */
function printUpdateMessage(oldVersion: string, newVersion: string, packageName: string): void {
    printers.printInfo('\n\tUpdate available');
    printers.printInfo(oldVersion, 'gray');
    printers.printInfo(' -> ');
    printers.printInfo(newVersion, 'greenBright');
    printers.printInfo('\n\tRun ');
    printers.printInfo(`npm install -g ${packageName} `, 'blueBright');
    printers.printInfo('to update\n');
}
