import { IExecSyncResult, IExecOptions } from 'azure-pipelines-task-lib/toolrunner';
import { execSync } from "child_process";
import tl = require("azure-pipelines-task-lib");
import path = require("path");
import fs = require("fs");

export class Core {
    private isLoggedIn: boolean = false;
    private cliPasswordPath: string = "";
    private servicePrincipalId: string = "";
    private servicePrincipalKey: string = "";
    private subscriptionID: string = "";

    private prefix: string = "";
    private parametersPublish = {
        'resource-group': 'resource-group',
        'name': 'name',
        'proj-name': 'proj-name',
        'code-dir': 'code-dir',
        'version': 'version'
    };

    constructor() {
        this.getPrefix();
        this.subscriptionID = tl.getVariable('subscriptionID');
        
        if (this.subscriptionID == null) {
            this.loginAzureRM(tl.getInput("connectedServiceNameARM", true));
            tl.setVariable('subscriptionID', this.subscriptionID);
        }
    }
    
    public botPublish(): void {
        var inputs: string = this.GetParameters(this.parametersPublish);
        
        this.run(`az bot publish ` +
            `--subscription ${this.subscriptionID} ` +
            `${inputs} ` +
            `--verbose`);
    }

    private getCWD(cwd: string): IExecOptions {

        return <IExecOptions> { cwd: tl.getInput(cwd) };
    }

    private GetParameters(parameters: any): string {
        var inputs: string[] = [];
        for (var key in parameters) {
            var input = tl.getInput(key);
            if (input != null) {
                inputs.push(`--${key} ${input}`);
            }
        }
        
        return inputs.join(' ');
    }

    private run(command: string, options?: IExecOptions): void{
        var command = `${this.prefix} ${command}`;
        console.log(`Running command: ${command}.`);
        try {
            console.log(execSync(command, options).toString());
        }
        catch (error) {
            this.LogError(`A problem ocurred: ${error.message}`);
        }
    }

    private LogError(message: string): void {
        tl.setResult(tl.TaskResult.Failed, message);
    }

    private getPrefix(): void {
        this.prefix = tl.osType() == "Linux" ? "sudo" : "";
    }
    
    private loginAzureRM(connectedService: string): void {
        var authScheme: string = tl.getEndpointAuthorizationScheme(connectedService, true);
        this.subscriptionID = tl.getEndpointDataParameter(connectedService, "SubscriptionID", true);
        if(authScheme.toLowerCase() == "serviceprincipal") {
            let authType: string = tl.getEndpointAuthorizationParameter(connectedService, 'authenticationType', true);
            let cliPassword: string;
            var servicePrincipalId: string = tl.getEndpointAuthorizationParameter(connectedService, "serviceprincipalid", false);
            if (authType == "spnCertificate") {
                tl.debug('certificate based endpoint');
                let certificateContent: string = tl.getEndpointAuthorizationParameter(connectedService, "servicePrincipalCertificate", false);
                cliPassword = path.join(tl.getVariable('Agent.TempDirectory') || tl.getVariable('system.DefaultWorkingDirectory'), 'spnCert.pem');
                fs.writeFileSync(cliPassword, certificateContent);
                this.cliPasswordPath = cliPassword;

            }
            else {
                tl.debug('key based endpoint');
                cliPassword = tl.getEndpointAuthorizationParameter(connectedService, "serviceprincipalkey", false);
                this.servicePrincipalId = servicePrincipalId;
                this.servicePrincipalKey = cliPassword;
            }
            var tenantId: string = tl.getEndpointAuthorizationParameter(connectedService, "tenantid", false);

            //login using svn
            this.throwIfError(tl.execSync("az", `login --service-principal -u "${servicePrincipalId}" -p "${cliPassword}" --tenant "${tenantId}"`), "Azure Login Failed!");
        }
        else if(authScheme.toLowerCase() == "managedserviceidentity") {
            //login using msi
            this.throwIfError(tl.execSync("az", "login --identity"), "Managed Service Identity Failed!");
        }
        else{
            throw console.error("Auth Scheme %s is not supported", authScheme);
        }

        this.isLoggedIn = true;
        //set the subscription imported to the current subscription
        this.throwIfError(tl.execSync("az", `account set --subscription "${this.subscriptionID}"`), "Error in setting up subscription");
    }

    private throwIfError(resultOfToolExecution: IExecSyncResult, errormsg?: string): void {
        if (resultOfToolExecution.code != 0) {
            tl.error("Error Code: [" + resultOfToolExecution.code + "]");
            if (errormsg) {
                tl.error("Error: " + errormsg);
            }
            throw resultOfToolExecution;
        }
    }
}