@echo off

rd /s /q ..\src

call autorest README.md --typescript --use=@microsoft.azure/autorest.typescript@preview

