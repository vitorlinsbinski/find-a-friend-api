## Use-cases

- Organization
  [] register-organization
  [] authenticate-organization
  [] get-organization-details

- Pet
  [] create-pet
  [] fetch-nearby-pets
  [] fetch-filtered-nearby-pets
  [] get-pet-details

## Repositories

[] Organization Repository
[] Pet Repository

## Controllers

- Organizations
  [] register (POST /organizations)
  [] authenticate (POST /session)
  [] details (GET /organizations)

- Pets
  [] create (POST /pets)
  [] nearby (GET /pets/nearby)
  [] filtered-nearby (GET /pets/nearby/filter)
