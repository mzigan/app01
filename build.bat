rmdir /S/Q out
xcopy src out /E/H/C/I
xcopy assets out\assets /E/H/C/I
copy assets\package.json out
copy assets\install.bat out
call out\install.bat
CD /D "%~dp0"
npx electron-builder --project out
