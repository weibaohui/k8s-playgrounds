import * as fs from 'node:fs'
import process from 'node:process'
import { NestFactory } from '@nestjs/core'
import { app } from 'electron'
import type { MicroserviceOptions } from '@nestjs/microservices'
import { ElectronIpcTransport } from '@doubleshot/nest-electron'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PlaygroundModule } from './playground.module'
import { AppModule } from './app/app.module'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

async function electronAppInit() {
  const isDev = !app.isPackaged
  app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin')
    app.quit()
  })

  if (isDev) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit')
          app.quit()
      })
    }
    else {
      process.on('SIGTERM', () => {
        app.quit()
      })
    }
  }

  await app.whenReady()
}

async function bootstrap() {
  try {
    await electronAppInit()

    const nestApp = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        strategy: new ElectronIpcTransport('IpcTransport'),
      },
    )
    const nestApp2 = await NestFactory.create(
      PlaygroundModule, {
        logger: ['error', 'warn', 'debug', 'log'],
      },
    )
    nestApp2.enableCors()
    const options = new DocumentBuilder()
      .setTitle('k8s-playgrounds')
      .setDescription('The  API description')
      .setVersion('1.0')
      .addTag('k8s-playgrounds')
      .build()
    const document = SwaggerModule.createDocument(nestApp2, options)
    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document))
    SwaggerModule.setup('api', nestApp2, document)

    await nestApp2.listen(3007)
    await nestApp.listen()
  }
  catch (error) {
    console.log('bootstrap', error)
    app.quit()
  }
}

bootstrap()
