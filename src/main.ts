import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });

  const options = new DocumentBuilder().setTitle(
    'Conduit Tourmanent API'
  ).setDescription('Conduit Tourmanent API').setVersion('1.0.0').build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api',app,document);
  
  await app.listen(process.env.PORT || 3000)
  
}
bootstrap();
