Introdução

Este teste é composto pela construção de uma SPA simples, composta por uma tela de cadastro de países.


Infraestrutura

Para suportar a mesma, um backend em Spring Boot foi desenvolvido e disponibilizado no arquivo BackendTesteFrontend-1.0.0.jar, disponibilizado junto ao arquivo deste enunciado.

Para executá-lo, basta ter o Java instalado no computador e executar o .jar:
Duplo clique em interfaces gráficas (ele não irá exibir nenhuma janela, porém o processo executará em background) ou;
java -jar BackendTesteFrontend-1.0.0.jar na linha de comando.

Uma vez ativo, o backend irá escutar na porta 8090 do computador local. Sua API está disponível no endereço http://localhost:8090/swagger-ui.html - trata-se de um Swagger UI que permite visualizar e testar a API.

Todos os métodos da API requisitam que seja passado um token de autenticação de usuário como parâmetro. Este token é obtido através dos métodos no endpoint /usuario/*.

Um token tem validade de 5 minutos e precisa ser renovado usando o método correspondente no endpoint /usuario/*. Caso seja passado um token inválido/expirado, a API irá retornar o código HTTP 401 na resposta da requisição.



Dados iniciais

Dois usuários já estão cadastrados:

"Login
"	"Senha
"	"Perfil
"
"convidado
"	"manager
"	"Usuário comum
"
"admin
"	"suporte
"	"Administrador
"


Três países estão cadastrados também.


Aplicação 

Tela de login, solicitando login e senha
Autenticação feita contra o backend
Deve salvar o token no storage local da aplicação no navegador, assim como a informação de se o usuário é administrador ou não (vem nas informações de resposta da autorização)
Tela principal com menu superior simples, com uma opção "Países". Na parte superior da tela o nome do usuário deve ser apresentado (vem nas informações de resposta da autorização)
Tela para consulta/edição de países
Só permite editar/excluir/incluir se for administrador
Deve exibir lista dos países em tabela paginada, com paginação no cliente e ordenação também no cliente
Deve permitir editar/incluir/excluir países
Os campos devem ter as validações adequadas aos dados (como sigla do estado ser 2 caracteres textuais, por exemplo)
Como o token expira, deve ser renovado antes de cada requisição ou capturar os retornos 401 do backend e reautorizar o token automaticamente, tornando o processo transparente ao usuário

