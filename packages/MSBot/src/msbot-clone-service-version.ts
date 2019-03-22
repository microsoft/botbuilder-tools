export class ServiceVersion {
    constructor(version: string) {
        const versionPattern = /([0-9]+)(?:\.([0-9]+)(?:\.([0-9]+)(?:\.([0-9]+))?)?)?/;
        const versions = versionPattern.exec(version) || ['0', '0', '0', '0', '0'];
        this.major = parseInt(versions[1]);
        this.minor = parseInt(versions[2]) || 0;
        this.patch = parseInt(versions[3]) || 0;
        this.revision = parseInt(versions[4]) || 0;
    }

    public major: number;
    public minor: number;
    public patch: number;
    public revision: number;

    public isOlder(version: ServiceVersion): boolean {

        let thisVersion: number[] = [this.major, this.minor, this.patch, this.revision];
        let theirVersion: number[] = [version.major, version.minor, version.patch, version.revision];

        for (let i = 0; i < thisVersion.length; i++) {
            if (thisVersion[i] < theirVersion[i]) {
                return true;
            }
            if (thisVersion[i] > theirVersion[i]) {
                return false;
            }
        }
        return false;
    }
}
