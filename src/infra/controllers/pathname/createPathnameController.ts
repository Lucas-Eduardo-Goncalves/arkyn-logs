class CreatePathnameController {
  constructor(private createPathnameUseCase: CreatePathnameUseCase) {}

  async handle(route: RouteDTO) {
    try {
      await AuthMiddleware.authenticate(route);

      const trafficSourceId = route.request.params?.trafficSourceId;
      const domainId = route.request.params?.domainId;
      const body = route.request.body;

      const schemaValidator = new SchemaValidatorAdapter(createPathnameSchema);
      const data = schemaValidator.validate({
        ...body,
        trafficSourceId,
        domainId,
      });

      const trafficsource = await this.createPathnameUseCase.execute(data);

      return route.response.json(trafficsource, 201);
    } catch (error) {
      const errorHandlerAdapter = new ErrorHandlerAdapter();
      return errorHandlerAdapter.handle(error);
    }
  }
}

export { CreatePathnameController };
