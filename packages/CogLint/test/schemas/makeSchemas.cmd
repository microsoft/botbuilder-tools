@echo off
del /q ..\examples\*.lg
call node ..\..\..\cogschema\lib\cogschema\src\cogschema.js *.schema -o ..\examples\app.schema
call node ..\..\..\cogschema\lib\cogschema\src\cogschema.js prompt.schema -o ..\examples\promptOnly.schema
