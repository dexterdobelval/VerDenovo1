@echo off
echo Compilando projeto...
.\mvnw.cmd clean package -DskipTests
echo Build concluido!