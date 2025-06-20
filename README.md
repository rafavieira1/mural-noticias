# 📰 Mural de Notícias

## 🎯 Informações do Módulo

- **Nome do Módulo:** Mural de Notícias
- **Responsável:** Rafael Silva Vieira
- **Tecnologias Utilizadas:** Node.js, PostgreSQL, React + TypeScript, Docker

## 🎯 Descrição do Módulo

O Mural de Notícias é um módulo da Plataforma Modular de Gestão de Eventos Acadêmicos que permite criar, visualizar, editar e deletar notícias acadêmicas. Todas as operações são protegidas por autenticação JWT, validada através do módulo Auth.

## 🔌 Endpoints Expostos

### Base URL: `http://localhost:3002/api`

| Método | Endpoint | Descrição | JWT Required |
|--------|----------|-----------|--------------|
| GET | `/noticias` | Lista todas as notícias | ✅ |
| GET | `/noticias/:id` | Busca notícia por ID | ✅ |
| POST | `/noticias` | Cria nova notícia | ✅ |
| PUT | `/noticias/:id` | Atualiza notícia | ✅ |
| DELETE | `/noticias/:id` | Remove notícia | ✅ |
| GET | `/health` | Health check | ❌ |

### Exemplos de Request/Response

#### Criar Notícia
```bash
POST /api/noticias
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "titulo": "Nova Notícia Acadêmica",
  "conteudo": "Conteúdo da notícia...",
  "categoria": "Acadêmico"
}
```

#### Listar Notícias
```bash
GET /api/noticias
Authorization: Bearer <jwt_token>
```

## 🔌 Endpoints Consumidos

- **Módulo Auth:** `POST /api/auth/validate` - Validação de token JWT

## 🌐 Portas e Serviços

| Serviço | Porta | URL |
|---------|-------|-----|
| Backend API | 3002 | http://localhost:3002 |
| Frontend React | 3003 | http://localhost:3003 |
| PostgreSQL | 5432 | localhost:5432 |
| Swagger/Docs | 3002 | http://localhost:3002/api-docs |

## 🌍 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor | 3002 |
| `DATABASE_URL` | URL de conexão com PostgreSQL | - |
| `AUTH_SERVICE_URL` | URL do serviço de autenticação | http://auth-service:3000 |
| `NODE_ENV` | Ambiente de execução | development |

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm ou yarn

### Backend
```bash
cd backend
npm install
cp env.example .env
# Configure as variáveis de ambiente no .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🐳 Como Rodar via Docker Compose

### Desenvolvimento

#### Opção 1: Scripts de Inicialização (Recomendado)
```bash
# Windows
start-dev.bat

# Linux/Mac
chmod +x start-dev.sh
./start-dev.sh
```

#### Opção 2: Manual
```bash
# Clone o repositório
git clone <url-do-repositorio>
cd projeto_final_tds

# Configure as variáveis de ambiente
cp backend/env.example backend/.env
# Edite o arquivo backend/.env com suas configurações

# Execute com Docker Compose
docker-compose up --build
```

### Produção
```bash
docker-compose -f docker-compose.yml up --build -d
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: `noticias`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | SERIAL | Chave primária |
| titulo | VARCHAR(255) | Título da notícia |
| conteudo | TEXT | Conteúdo da notícia |
| autor | VARCHAR(255) | Nome do autor |
| categoria | VARCHAR(100) | Categoria da notícia |
| data_criacao | TIMESTAMP | Data de criação |

## 🔒 Segurança

- Todas as rotas protegidas validam JWT através do módulo Auth
- Validação de entrada em todos os endpoints
- Sanitização de dados antes de persistir no banco

## 🧪 Testes

### Testar Endpoints
1. Faça login no módulo Auth para obter um JWT
2. Use o JWT nos headers das requisições
3. Teste os endpoints via Swagger UI: `http://localhost:3002/api-docs`

### Testar Frontend
1. Acesse `http://localhost:3003`
2. Faça login com JWT válido
3. Teste as funcionalidades de CRUD

## 📝 Logs e Monitoramento

- Logs do backend: `docker-compose logs mural-noticias-backend`
- Logs do frontend: `docker-compose logs mural-noticias-frontend`
- Logs do banco: `docker-compose logs mural-noticias-db`

## 🔧 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco:**
   - Verifique se o PostgreSQL está rodando
   - Confirme a URL de conexão no .env

2. **Erro de validação JWT:**
   - Verifique se o módulo Auth está rodando
   - Confirme a URL do AUTH_SERVICE_URL

3. **Frontend não carrega:**
   - Verifique se o backend está rodando na porta 3002
   - Confirme se o proxy está configurado corretamente

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com:
- **Rafael Silva Vieira**
- Email: [seu-email@exemplo.com]
- GitHub: [seu-github]

## 📋 Checklist de Requisitos

- [x] ✅ JWT válido (consumir o Auth)
- [x] ✅ Banco de dados isolado
- [x] ✅ Ao menos 3 endpoints protegidos (5 implementados)
- [x] ✅ Consumir um endpoint de outro módulo (Auth)
- [x] ✅ Interface web simples para testes
- [x] ✅ Dockerfile funcional
- [x] ✅ README detalhado
- [x] ✅ Documentação Swagger/OpenAPI
- [x] ✅ Docker Compose configurado
- [x] ✅ Validação de token em todas as rotas protegidas 