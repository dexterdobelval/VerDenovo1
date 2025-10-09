@echo off
echo Executando VerDenovo Backend...
echo.

REM Verificar se Java está instalado
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Java não encontrado!
    echo Instale Java 17 ou superior: https://adoptium.net/
    pause
    exit /b 1
)

REM Compilar e executar usando Maven Wrapper
if exist mvnw.cmd (
    echo Usando Maven Wrapper...
    mvnw.cmd spring-boot:run
) else (
    echo Maven Wrapper não encontrado. Tentando Maven global...
    mvn spring-boot:run
)

pause