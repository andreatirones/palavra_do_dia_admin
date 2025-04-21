# Palavra do Dia - Painel Administrativo

Este repositório contém o código-fonte do painel administrativo para o projeto "Palavra do Dia", uma aplicação para gerenciar palavras diárias com reflexões para publicação no Instagram.

## Estrutura do Projeto

O projeto foi reorganizado para funcionar corretamente no Render:

```
palavra_do_dia_render/
├── src/
│   ├── backend/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── server.js
│   ├── database/
│   │   ├── models/
│   │   └── init.js
│   ├── frontend/
│   │   ├── css/
│   │   ├── js/
│   │   └── ...
│   ├── assets/
│   │   └── textures/
│   ├── uploads/
│   └── .env
├── package.json
└── render.yaml
```

## Requisitos

- Node.js 14 ou superior
- MongoDB
- Navegador web moderno

## Configuração

1. Clone este repositório
2. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   PORT=3000
   MONGODB_URI=sua_string_de_conexao_mongodb
   JWT_SECRET=sua_chave_secreta
   JWT_EXPIRE=30d
   NODE_ENV=production
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Inicie o servidor:
   ```
   npm start
   ```

## Implantação no Render

Este projeto está configurado para implantação no Render. O arquivo `render.yaml` contém as configurações necessárias.

### Passos para implantação:

1. Crie uma conta no [Render](https://render.com/)
2. Conecte seu repositório GitHub
3. Crie um novo serviço Web
4. Configure a variável de ambiente `MONGODB_URI` com sua string de conexão MongoDB
5. Implante o serviço

## Funcionalidades

- Sistema de autenticação seguro
- Gerenciamento de palavras em português e inglês
- Geração automática de imagens
- Calendário de publicação
- Sistema de comentários
- Estatísticas de uso
- Configurações personalizáveis

## Credenciais Padrão

- Email: admin@palavradodia.com
- Senha: admin123

**Importante:** Altere a senha padrão após o primeiro login.

## Licença

Este projeto é propriedade exclusiva e não está licenciado para uso público.
