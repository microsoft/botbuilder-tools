@echo off
setlocal
del /q ..\examples\*.lg
set cs=..\..\..\cogschema\lib\cogschema\src\cogschema.js
if exist %cs% goto run
pushd ..\..\..\cogschema
call npm run build
popd
:run
call node %cs% *.schema -o ..\examples\app.schema
call node %cs% prompt.schema -o ..\examples\promptOnly.schema
call node %cs% *.schema -f -o ..\examples\app-flat.schema