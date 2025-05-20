type RouteDTO = {
  request: {
    body?: any;
    params?: Record<string, string>;
    query?: Record<string, string>;
  };

  response: {
    json: (data: any, status?: number) => any;
  };
};

export { RouteDTO };
