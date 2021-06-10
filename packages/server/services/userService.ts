import prismaClient from './prismaClient';

interface User {
  id: string,
  username: string,
}

function authenticate(username: string, password: string): Promise<User | null> {
  return prismaClient.user.findFirst({
    where: { username, password },
    select: { id: true, username: true },
  });
}

export default {
  authenticate,
};
