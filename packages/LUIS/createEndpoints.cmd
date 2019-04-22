echo off 
echo This batch file uses AZ CLI to create an Azure Resource group for LUIS resources and
echo creates a LUIS cognitive service endpoint for each region LUIS is supported in.
if "%1" == "" goto help
set regions=westus eastus2 westcentralus southeastasia southcentralus westus2 eastus eastasia brazilsouth japaneast koreacentral canadacentral centralindia centralus northcentralus japanwest
call az group create -n %1 -l westus 
(for %%s in (%regions%) do (
  echo creating LUIS resource for %%s
  call az cognitiveservices account create -g LUIS --kind LUIS --sku S0 --name "%1-%%s" --location %%s --yes
))
goto end
:help
echo createLuisEndpoints [groupname] 
echo you need to pass the name of the group you want to create your LUIS resources in
:end