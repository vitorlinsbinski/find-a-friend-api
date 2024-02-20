export class OrganizationAddressAlreadyExistsError extends Error {
  constructor() {
    super('Organization address already exists.');
  }
}
