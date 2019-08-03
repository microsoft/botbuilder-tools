@echo off
setlocal

set ds=..\..\..\dialogschema\lib\dialogSchema.js
if exist %ds% goto lint
pushd ..\..\..\dialogschema
call npm run build
popd

:lint
set dl=..\..\..\dialoglint\lib\dialoglint.js
if exist %dl% goto run
pushd ..\..\..\dialoglint
call npm run build
popd

:run
call node %ds% *.schema -o ..\examples\app.schema
call node %ds% prompt.schema -o ..\examples\promptOnly.schema

