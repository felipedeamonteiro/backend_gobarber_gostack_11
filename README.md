# Backend-Bootcamp
Backend do Bootcamp GoStack

## Lista de Tarefas

### Recureação de Senha

**Regras Funcionais - Estória de Usuário**

 - O usuário dev poder recuperar sua senha informando o seu e-mail;
 - O usuário deve receber um e-mail com instruções de recuperação de senha;
 - O usuário deve poder resetar sua senha;

**Regras Não Funcionais - Detalhes de ferramentas utilizadas para as funcionalidades**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background jog);

**Regras de Negócio - Lógica para as RF acontecerem**

- O link enviado por email para resetar senha, deve expirar em 2hs;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

### Atualização do Perfil

**Regras Funcionais**

- O usuário deve poder atualizar seu nome, email e senha;

**Regras de Negócio**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar a senha, o usuário deve informar a senha antiga;
- Para atualizar a senha, o usuário precisa confirmá-la;

### Painel do Prestador de Serviços

**Regras Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**Regras Não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando o Socket.io;


**Regras de Negócio**

- A notificação deve ter status de lida ou não-lida para que o prestador possa controlar;

### Agendamento de Serviços

**Regras Funcionais**

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**Regras Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**Regras de Negócio**

- Cada agedamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre as 8hs e 18hs (Primeiro às 8hs, último as 17hs);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;


# Para rodar o projeto

Primeiro é necessário intalar docker e as imagens abaixo:

```
docker run --name mongodb -p 27017:27017 -d -t mongo
```
```
docker run --name redis -p 6379:6379 -d -t redis:alpine
```
```
docker run --name gostack_postgres -e POSTGRES_PASSWROD=docker -p 5432:5432 -d postgres
```

Depois disso para rodar o servidor localmente rode:

```
yarn dev:server
```

## Tarefas faltantes!
- Configurar Amazon SES para envio de emails em produção;
- Configurar Amazon SE para armazenar imagens;
