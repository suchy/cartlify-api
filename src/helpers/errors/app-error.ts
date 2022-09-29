export interface AppError extends Error {
  trusted: boolean;
  statusCode: number;
  statusText: string;
  details?: object;
}
