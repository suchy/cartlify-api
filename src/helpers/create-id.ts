import { v4 as uuid } from 'uuid';

export type createId = () => string;

export const createId: createId = uuid;
