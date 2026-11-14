@echo off
setlocal enabledelayedexpansion
title Setup Kokoro TTS Local Engine - virusescu.github.io

echo =========================================================
echo   virusescu Tutorials: Local Voice Engine Setup (Kokoro)
echo =========================================================
echo.

:: 1. Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not found in PATH!
    echo Please install Python 3.10+ from python.org or Microsoft Store.
    pause
    exit /b 1
)

echo [1/3] Python detected:
python --version
echo.

:: 2. Install Python requirements
echo [2/3] Installing Python dependencies (kokoro-onnx, soundfile, edge-tts)...
python -m pip install -r "%~dp0requirements.txt"
if errorlevel 1 (
    echo [ERROR] Failed to install Python dependencies.
    pause
    exit /b 1
)
echo.

:: 3. Download Model Weights
echo [3/3] Downloading local neural weights (kokoro-v0_19.onnx and voices.bin)...
python "%~dp0download_models.py"
if errorlevel 1 (
    echo [ERROR] Model download failed.
    pause
    exit /b 1
)

echo.
echo =========================================================
echo   [SUCCESS] Kokoro TTS Local Engine is completely set up!
echo   Models are saved in tutorials/_engine/models/
echo   (Excluded from git via .gitignore)
echo =========================================================
echo.
pause
