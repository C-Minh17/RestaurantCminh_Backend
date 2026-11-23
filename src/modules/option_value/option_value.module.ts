import { Module } from '@nestjs/common';
import { OptionValueService } from './option_value.service';
import { OptionValueController } from './option_value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionValue } from './entities/option_value.entity';
import { Menu } from '../menu/entities/menu.entity';

@Module({
  controllers: [OptionValueController],
  providers: [OptionValueService],
  imports: [TypeOrmModule.forFeature([OptionValue, Menu])],
  exports: [OptionValueService],
})
export class OptionValueModule { }
