@echo off
echo.
echo ========================================
echo   🔧 PUSH VERS DEV
echo ========================================
echo.

if "%~1"=="" (
    echo ❌ Erreur: Message de commit requis
    echo.
    echo Usage: dev.bat "Votre message de commit"
    echo Exemple: dev.bat "Ajout nouvelle fonctionnalite"
    pause
    exit /b 1
)

echo 📝 Basculement sur branche dev...
git checkout dev

echo 📝 Ajout des fichiers...
git add .

echo 💾 Commit: %~1
git commit -m "%~1"

echo 📤 Push vers GitHub (branche dev)...
git push origin dev

echo.
echo ✅ Push DEV terminé !
echo 💡 Pour déployer en production, utilisez: prod.bat
echo.
pause
