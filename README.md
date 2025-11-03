# Mercato
## Descrição
- Projeto Back-end de um sistema administrativo de mercado, incluindo módulo de pedidos de produtos realizados por usuários via comércio digital e integração de pagamentos com o Mercado Pago.
## Funcionalidades
- Autenticação de usuário;
- Autorização de usuário baseada em permissões;
- Listar, cadastrar, editar e excluir produtos;
- Integração de pagamento com o Mercado Pago;
- Editar permissões;
- Listar usuários e editar status de usuários.
## Tecnologias e ferramentas utilizadas
- Express;
- Node.js;
- TypeScript;
- Prisma ORM;
- PostgreSQL;
- API do Mercado Pago;
- Zod;
- Helmet;
- Postman;
- ESLint e Prettier;
- Gitflow;
- Conventional Commits.
## Como rodar a aplicação
- Primeiramente, é necessário clonar o repositório localmente;
- Após clonar o repositório localmente, é necessário instalar o PostgreSQL localmente caso não tenha;
- Em seguida, execute o comando npm install na pasta do projeto para instalar as dependências da aplicação;
- O próximo passo é executar os comandos npx prisma migrate dev e na sequência npx prisma client para integrar o banco de dados local com a API e também gerar as tipagens do Prisma;
- Depois, execute o comando npm run dev que irá executar a API possivelmente na porta 3000 localmente;
- Observação: é necessário adicionar um arquivo chamado .env na raiz do diretório da aplicação e, em seguida, preencher com as variáveis de ambiente conforme exemplo do arquivo .env.example.
## Licença
Este código está licenciado usando a [licença-MIT](./LICENSE).
