# Recuperação de senha

//Requisitos funcionais
**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

//Requisitos não funcionais
**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios de produção;
- O envio de e-mails deve acontecer em segundo plano;

//Regras de negocios
**RN**

- O link enviado por email para resetar a senha, deve expirar em x horas;
- O usuário precisa confirmar a nova senha ao resetar a senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar a sua senha, o usuário deve informa a senha antiga;
- Para atualizar a sua senha, o usuário deve confirmar a nova senha;

# Painell do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notifcações do prestador devem ser armazenadas no MongoDB;
- As notifcações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com horário disponível, do prestador escolhido;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente (provisório);
- Os agendamentos devem estar disponíveis entre 8h às 18h;
- O usuário não pode agendar um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

#

--- Nível 2 ---

    - NodeJS
        - instalar e criar o container usando Docker[x]
        - instalar e configurar o TypeORM[x]
        - criar a tabela de agendamentos(Appointments)[x]
        - criar a model de agendamentos[x]
        - criar o repositorio do TypeORM[x]
        - criar a model e a migration dos usuarios[x]
        - criar o relacionamento nos models[x]
        - adicionar a criação de usuarios[x]
        - criptografar as senhas[x]
        - comparar email e senha para o login[x]
        - autenticar as rotas com JWT[x]
        - configurando o multer [x]
        - adicionando na rota [x]
        - checar se existe a imagem, caso exista deleta e salva a outra [x]
        - alterar no banco [x]
        - tratamento de erros [x]

--- Nivel 4 ---

- TDD
