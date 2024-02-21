## Requisitos funcionais

[x] Deve ser possível cadastrar um pet
[x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[x] Deve ser possível filtrar pets por suas características
[x] Deve ser possível visualizar detalhes de um pet para adoção
[x] Deve ser possível se cadastrar como uma ORG
[x] Deve ser possível realizar login como uma ORG

## Regras de negócio

[x] Para listar os pets, obrigatoriamente precisamos informar a cidade
[x] Uma ORG precisa ter um endereço e um número de WhatsApp
[x] Um pet deve estar ligado a uma ORG
[x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[x] Todos os filtros, além da cidade, são opcionais
[] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos não funcionais

[x] A senha da organização cadastrada deve estar criptografada no banco de dados
[x] Para autenticação da organização, deve-se utilizar JWT como token de acesso
[x] Os dados da aplicação devem estar persistidos em um banco PostgreSQL
[] A lista de pets por cidade e estado devem ser trazidas em intervalos de 20 items por página
