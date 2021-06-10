import { Request as ExpressRequest } from 'express';

export interface User {
  id: string,
  username: string,
}

export type Request = ExpressRequest & {
  user?: User
};
