declare module '@/api/sourcesConfig' {
  export function getSources(page?: number, itemsPerPage?: number): Promise<any>;
  export function getSourceConfig(name: string): Promise<any>;
  export function getSourcePathConfig(name: string): Promise<any>;
  export function addSourceConfig(name: string, config: any): Promise<any>;
  export function updateSourceConfig(name: string, config: any): Promise<any>;
  export function deleteSourceConfig(name: string): Promise<any>;
} 