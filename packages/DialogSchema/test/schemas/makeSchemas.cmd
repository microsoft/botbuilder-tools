@echo off
setlocal
del /q ..\examples\*.lg
set cs=..\..\lib\dialogschemaMain.js
if exist %cs% goto run
pushd ..\..\..\dialogschema
call npm run build
popd
:run
call node %cs% *.schema -o ..\examples\app.schema
call node %cs% prompt.schema -o ..\examples\promptOnly.schema