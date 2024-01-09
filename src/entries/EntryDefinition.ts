export class EntryDefinition {
  public constructor(
    public readonly raw: string,
    public attributes?: Record<string, unknown>,
  ) {}
}
