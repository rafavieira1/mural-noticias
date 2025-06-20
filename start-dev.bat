@echo off
echo 🚀 Iniciando Mural de Notícias - Ambiente de Desenvolvimento
echo ==========================================================

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker não está instalado. Por favor, instale o Docker primeiro.
    pause
    exit /b 1
)

REM Verificar se Docker Compose está instalado
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro.
    pause
    exit /b 1
)

echo ✅ Docker e Docker Compose encontrados

REM Criar arquivo .env se não existir
if not exist "backend\.env" (
    echo 📝 Criando arquivo .env para o backend...
    copy "backend\env.example" "backend\.env"
    echo ✅ Arquivo .env criado. Configure as variáveis de ambiente se necessário.
)

echo 🐳 Iniciando containers com Docker Compose...
docker-compose up --build

echo 🎉 Serviços iniciados!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:3001
echo 📚 API Docs: http://localhost:3001/api-docs
echo 🗄️  Banco de dados: localhost:5432

pause 