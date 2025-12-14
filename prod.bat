@echo off
echo.
echo ========================================
echo   🚀 DEPLOIEMENT EN PRODUCTION
echo ========================================
echo.
echo Cette action va :
echo 1. Fusionner dev dans main
echo 2. Pousser sur GitHub
echo 3. Deployer AUTOMATIQUEMENT sur le serveur
echo.
echo Appuyez sur une touche pour continuer...
pause >nul

echo.
echo 📥 Synchronisation branche dev...
git checkout dev
git pull origin dev

echo.
echo 📥 Synchronisation branche main...
git checkout main
git pull origin main

echo.
echo 🔀 Fusion dev -> main...
git merge dev -m "Merge dev into main for production deployment"

if errorlevel 1 (
    echo.
    echo ❌ Erreur lors du merge !
    echo Resolvez les conflits puis reessayez.
    pause
    exit /b 1
)

echo.
echo 📤 Push vers GitHub (deploiement auto)...
git push origin main

if errorlevel 1 (
    echo.
    echo ❌ Erreur lors du push !
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ DEPLOIEMENT EN COURS !
echo ========================================
echo.
echo 🌐 Le serveur se met a jour automatiquement...
echo 👁️  Verifiez les logs sur GitHub Actions
echo 🔗 https://github.com/clem301/NgManager/actions
echo.
echo Retour sur branche dev...
git checkout dev

echo.
pause
