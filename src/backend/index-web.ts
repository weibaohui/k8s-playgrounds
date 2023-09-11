import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PlaygroundModule } from './playground.module'

async function bootstrap() {
  try {
    const nestApp = await NestFactory.create(
      PlaygroundModule, {
        logger: ['error', 'warn', 'debug', 'log'],
      },
    )
    nestApp.enableCors()
    const options = new DocumentBuilder()
      .setTitle('k8s-playgrounds')
      .setDescription('The  API description')
      .setVersion('1.0')
      .addTag('k8s-playgrounds')
      .build()
    const document = SwaggerModule.createDocument(nestApp, options)
    // fs.writeFileSync('./swagger-spec.json', JSON.stringify(document))
    SwaggerModule.setup('api', nestApp, document)
    await nestApp.listen(3007)
  }
  catch (error) {
    console.log('bootstrap', error)
  }
}

bootstrap()
