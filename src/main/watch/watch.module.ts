import { WatchService } from '@main/watch/watch.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [
    WatchService,
  ],
  exports: [WatchService],
})
export class WatchModule {}
