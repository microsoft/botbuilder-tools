@echo off
setlocal
del /q ..\examples\*.lg

set ds=..\..\..\dialogschema\lib\dialogschemaMain.js
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

pushd ..\examples
call node %dl% *.dialog -w app.lg
popd
