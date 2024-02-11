import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
//import { LoggerModuleService } from './logger-module/logger-module.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  })
  const {httpAdapter} = app.get(HttpAdapterHost )

  //app.useLogger(app.get(LoggerModuleService))
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.enableCors()
  app.setGlobalPrefix('api')
  await app.listen(process.env.NEST_API_PORT)
}
bootstrap();
