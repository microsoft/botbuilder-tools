@echo off
del ..\examples\*.lg
call cogschema *.schema -o ..\examples\app.schema
call cogschema prompt.schema -o ..\examples\promptOnly.schema
