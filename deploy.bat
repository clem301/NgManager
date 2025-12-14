@echo off
echo.
echo ========================================
echo   🚀 DEPLOIEMENT NG MANAGER
echo ========================================
echo.

if "%~1"=="" (
    echo ❌ Erreur: Message de commit requis
    echo.
    echo Usage: deploy.bat "Votre message de commit"
    echo Exemple: deploy.bat "Ajout nouvelle fonctionnalite"
    pause
    exit /b 1
)

echo 📝 Ajout des fichiers...
git add .

echo 💾 Commit: %~1
git commit -m "%~1"

echo 📤 Push vers GitHub...
git push origin main

echo.
echo ✅ Code pousse sur GitHub !
echo.
echo ⚙️  Pour deployer sur le serveur, executez:
echo ssh root@VOTRE_IP "cd /var/www && ./deploy.sh"
echo.
pause
