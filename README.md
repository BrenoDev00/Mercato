Descrição
Projeto Back-end de um sistema administrativo de mercado, incluindo módulo de pedidos de produtos realizados por usuários.
Funcionalidades
Cadastrar, listar, atualizar e remover usuários;
Listar informações de compra por usuário;
Cadastrar, listar, atualizar e remover produtos;
Cadastrar, listar, atualizar e remover compras.
Tecnologias e ferramentas utilizadas
Express: framework utilizado para estruturar a API RESTful;
Node.js: utilizado para desenvolver a API;
TypeScript: inicialmente a API foi desenvolvida com JavaScript e depois migrada para TypeScript;
node-postgres: conexão e queries no banco de dados através da API, além de proteção contra SQL Injection;
Zod: validação de entradas do client pela API;
Helmet: definição de cabeçalho HTTP da API;
PostgreSQL: banco de dados relacional utilizado para armazenar dados da aplicação;
Postman: utilizado para testar os endpoints da aplicação;
ESLint e Prettier: estilo de código e formatação;
draw.io: utilizado para modelagem de dados do banco de dados;
Excel: utilizado para desenvolver o dicionário de dados do banco de dados;
Gitflow: fluxo de trabalho entre branches develop e main;
Conventional Commits: organização de commits.
Principais endpoints
/users (GET, POST);
/users/purchase-info (GET).
/products (GET, POST);
/products/:id (GET, PUT e DELETE).
/purchases (GET);
/purchases/:productId/:productAmmount (POST);
/purchases/:id/:productAmmount (PUT);
/purchases/:id (DELETE).
Dicionário de dados
Acesse aqui o arquivo xlsx do dicionário de dados.
Modelagem de dados
Acesse aqui o arquivo drawio da modelagem de dados.
Como rodar a aplicação
Primeiramente, é necessário ter o PostgreSQL instalado na máquina e criar um banco de dados. Depois, execute o script SQL schema-config no banco de dados criado;
Após configurar a estrutura do banco de dados, clone o repositório localmente;
Em seguida, execute o comando npm install para instalar as dependências da aplicação;
Depois, execute o comando npm run dev que irá rodar o servidor possivelmente na porta 3000 localmente;
Observação: é necessário adicionar um arquivo chamado .env na raiz do diretório da aplicação e, em seguida, preencher com as variáveis de ambiente conforme exemplo do arquivo .env.example.
Licença
Este código está licenciado usando a licença-MIT.
