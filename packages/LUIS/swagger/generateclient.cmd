@echo off

rd /s /q ..\src
rd /s /q generated

call npx autorest README.md --typescript 
rem call autorest README.md --typescript --use=@microsoft.azure/autorest.typescript@preview 

move generated\lib ..\src
rd /q generated
