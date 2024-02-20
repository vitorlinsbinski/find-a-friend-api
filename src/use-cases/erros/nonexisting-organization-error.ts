export class NonExistingOrganizationError extends Error {
  constructor() {
    super("This organization doesn't exist.");
  }
}
