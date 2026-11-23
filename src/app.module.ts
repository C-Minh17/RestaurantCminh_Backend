import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MenuModule } from './modules/menu/menu.module';
import { OptionValueModule } from './modules/option_value/option_value.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres123',
      database: process.env.DB_NAME || 'restaurant_db',
      autoLoadEntities: true, //TỰ ĐỘNG quét tất cả các file *.entity.ts trong mọi folder module
      synchronize: true,      //TỰ ĐỘNG TẠO BẢNG vào PostgreSQL khi khởi động app
    }),
    UserModule,
    AuthModule,
    CategoriesModule,
    MenuModule,
    OptionValueModule,
    // Các module tính năng khác
  ],
})
export class AppModule { }