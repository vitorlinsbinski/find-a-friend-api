## Requisitos funcionais

[] Deve ser possível cadastrar um pet
[] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[] Deve ser possível filtrar pets por suas características
[] Deve ser possível visualizar detalhes de um pet para adoção
[x] Deve ser possível se cadastrar como uma ORG
[x] Deve ser possível realizar login como uma ORG

## Regras de negócio

[] Para listar os pets, obrigatoriamente precisamos informar a cidade
[] Uma ORG precisa ter um endereço e um número de WhatsApp
[] Um pet deve estar ligado a uma ORG
[] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[] Todos os filtros, além da cidade, são opcionais
[] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos não funcionais

[] A senha da organização cadastrada deve estar criptografada no banco de dados
[] Para autenticação da organização, deve-se utilizar JWT como token de acesso
[] Os dados da aplicação devem estar persistidos em um banco PostgreSQL
[] A lista de pets por cidade e estado devem ser trazidas em intervalos de 20 items por página
