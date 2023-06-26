import { Injectable, Logger } from '@nestjs/common'
import { Cat } from './interfaces/cat.interface'
import { CreateCatDto } from './dto/create-cat.dto'

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name)

  private readonly cats: Cat[] = []

  init() {
    const dto = new CreateCatDto()
    dto.name = 'x'
    dto.age = 6
    dto.breed = 'xxxx'
    this.cats.push(dto)
    this.logger.log('init')
  }

  create(cat: Cat) {
    this.cats.push(cat)
  }

  findAll(): Cat[] {
    return this.cats
  }
}
