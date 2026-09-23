@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  for /d %%D in ("%~dp0..\.tools\node-v*-win-x64") do if exist "%%~D\node.exe" set "PATH=%%~fD;%PATH%"
)
call npm.cmd run dev
if errorlevel 1 pause
