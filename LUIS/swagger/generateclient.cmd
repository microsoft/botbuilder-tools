@echo off

rd /s /q ..\src

call autorest README.md --typescript

