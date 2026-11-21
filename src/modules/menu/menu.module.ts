import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  controllers: [MenuController],
  providers: [MenuService],
  imports: [TypeOrmModule.forFeature([Menu, Category])],
  exports: [MenuService],
})
export class MenuModule { }
