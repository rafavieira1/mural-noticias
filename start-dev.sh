#!/bin/bash

echo "🚀 Iniciando Mural de Notícias - Ambiente de Desenvolvimento"
echo "=========================================================="

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

echo "✅ Docker e Docker Compose encontrados"

# Criar arquivo .env se não existir
if [ ! -f "backend/.env" ]; then
    echo "📝 Criando arquivo .env para o backend..."
    cp backend/env.example backend/.env
    echo "✅ Arquivo .env criado. Configure as variáveis de ambiente se necessário."
fi

echo "🐳 Iniciando containers com Docker Compose..."
docker-compose up --build

echo "🎉 Serviços iniciados!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001/api-docs"
echo "🗄️  Banco de dados: localhost:5432" 