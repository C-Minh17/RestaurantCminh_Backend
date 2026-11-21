import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { MenuService } from './menu.service';
import { TransformResponseInterceptor } from 'src/common/interceptor/transform-response.interceptor';
import { CreatedMenuDto } from './dto/created-menu.dto';
import { UpdatedMenuDto } from './dto/updated-menu.dto';
import { Roles } from 'src/common/decorators/roles.decorater';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRole } from '../user/entities/user.entity';

@UseInterceptors(TransformResponseInterceptor)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }

  @Get()
  async getAllMenu() {
    return await this.menuService.getAllMenu();
  }

  @Get("/:id")
  async getMenuById(@Param("id") id: string) {
    return await this.menuService.getMenuById(id);
  }

  @Get("category/:id")
  async getMenuByCategory(@Param("id") id: string) {
    return await this.menuService.getMenuByCategory(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  async createMenu(@Body() data: CreatedMenuDto) {
    return await this.menuService.createMenu(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put("/:id")
  async updateMenu(@Body() data: UpdatedMenuDto, @Param("id") id: string) {
    return await this.menuService.updateMenu(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @Put("rating/:id")
  async updateRatingMenu(@Body("rating") data: number, @Param("id") id: string) {
    return await this.menuService.updateRatingMenu(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete("/:id")
  async deleteMenu(@Param("id") id: string) {
    return await this.menuService.deleteMenu(id);
  }

}
