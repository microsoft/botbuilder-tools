export class ServiceVersion {
    constructor(version: string) {
        const versionPattern = /([0-9]+)\.([0-9]+)\.([0-9]+)/;
        const versions = versionPattern.exec(version) || ['0', '0', '0', '0'];
        this.major = parseInt(versions[1]);
        this.minor = parseInt(versions[2]);
        this.patch = parseInt(versions[3]);
    }

    public major: number;
    public minor: number;
    public patch: number;

    public isOlder(version: ServiceVersion): boolean {

        let thisVersion: number[] = [this.major, this.minor, this.patch];
        let theirVersion: number[] = [version.major, version.minor, version.patch];

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
