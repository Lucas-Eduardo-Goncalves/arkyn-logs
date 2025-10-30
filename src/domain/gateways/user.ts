type UserGatewayDTO = {
  validateUserId: (id: string) => Promise<boolean>;
};

export type { UserGatewayDTO };
