import { join } from 'node:path'
import { Module } from '@nestjs/common'
import { ElectronModule } from '@doubleshot/nest-electron'
import { BrowserWindow, app } from 'electron'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ElectronModule.registerAsync({
      useFactory: async () => {
        const isDev = !app.isPackaged
        const win = new BrowserWindow({
          width: 1600,
          height: 1000,
          autoHideMenuBar: true,
          webPreferences: {
            contextIsolation: true,
            preload: join(__dirname, '../preload/index.js'),
          },
        })

        win.on('closed', () => {
          win.destroy()
        })
        // const URL = isDev
        //
        //   ? process.env.DS_RENDERER_URL
        //   : `file://${join(app.getAppPath(), 'dist/frontend/index.html')}`
        const URL = isDev

          ? process.env.DS_RENDERER_URL
          : 'http://127.0.0.1:3007'
        win.loadURL(URL)

        return { win }
      },
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
