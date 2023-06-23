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
import { RolesGuard } from '../common/roles.guard'
import { LoggingInterceptor } from '../common/logging.interceptor'
import { CreateCatDto } from './dto/create-cat.dto'
import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(
    private catsService: CatsService,
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

  @Get('/k8s')
  async k8s() {
    return await this.catsService.k8sPods()
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
    return `This action updates a #${id} cat`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`
  }
}
