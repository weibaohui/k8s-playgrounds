import { WatchService } from '@main/watch/watch.service'
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LoggingInterceptor } from '../common/logging.interceptor'
import { RolesGuard } from '../common/roles.guard'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(
    private catsService: CatsService,
    private watchService: WatchService,
    private configService: ConfigService,
  ) {}

  @Get('/config')
  async config() {
    // get an environment variable
    const dbUser = this.configService.get<string>('DATABASE_USER')
    // get a custom configuration value
    const dbHost = this.configService.get<string>('x.y', 'dddd')
    return {
      dbUser,
      dbHost,
    }
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto)
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }

  @Get('/init')
  async init() {
    this.catsService.init()
    return { status: 'ok' }
  }

  @Get('/watch')
  async watch() {
    await this.watchService.PodWatcher()
    await this.watchService.NsWatcher()
    return { status: 'ok' }
  }

  @Get('/pods')
  async pods() {
    return await this.watchService.k8sPods()
  }

  @Get('/pods/:ns')
  async podsByNs(@Param('ns') ns) {
    return await this.watchService.k8sPods(ns)
  }

  @Get('/ns')
  async ns() {
    return await this.watchService.k8sNs()
  }

  @Get('error')
  async error() {
    throw new ForbiddenException()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return `This action returns a #${id} cat`
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    console.log(updateCatDto)
    return `This action updates a #${id} cat`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`
  }
}
