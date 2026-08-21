export interface IntegrationProvider<TConfig = unknown, TResult = unknown> { id: string; describe(): string; fetch(config: TConfig): Promise<TResult> }
export interface IntegrationResult { provider: string; fetchedAt: string; data: unknown }
export async function runIntegration<TConfig, TResult>(provider: IntegrationProvider<TConfig, TResult>, config: TConfig): Promise<IntegrationResult> { return { provider: provider.id, fetchedAt: new Date().toISOString(), data: await provider.fetch(config) }; }
