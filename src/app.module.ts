import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from './category/category.module';
import { Category } from './category/schema/category.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/models/product.model';
import { UsersModule } from './users/users.module';
import { User } from './users/schemas/user.model';
import { CurrencyModule } from './currency/currency.module';
import { PriceYearModule } from './price_year/price_year.module';
import { DescriptionModule } from './description/description.module';
import { MediaModule } from './media/media.module';
import { Currency } from './currency/schemas/currency.model';
import { Description } from './description/schemas/description.model';
import { Media } from './media/schemas/media.model';
import { priceYear } from './price_year/schemas/price_year.model';
import { DiscountModule } from './discount/discount.module';
import { OrderModule } from './order/order.module';
import { Order } from './order/schemas/order.model';
import { Discount } from './discount/schemas/discount.model';
import { SearchHistoryModule } from './search_history/search_history.module';
import { AppliancesCharacteristicsModule } from './appliances_characteristics/appliances_characteristics.module';
import { PhoneCharacteristicsModule } from './phone_characteristics/phone_characteristics.module';
import { NotebookCharacteristicsModule } from './notebook_characteristics/notebook_characteristics.module';
import { Appliances } from './appliances_characteristics/schemas/appliancesCharacteric.model';
import { Phone } from './phone_characteristics/schemas/phone.model';
import { Notebook } from './notebook_characteristics/schemas/notebook.model';
import { FilesModule } from './files/files.module';
import { OtpModule } from './otp/otp.module';
import { Otp } from './otp/schemas/otp.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        port: config.get<number>('POSTGRES_PORT'),
        models: [
          Category,
          Product,
          User,
          Currency,
          Description,
          Media,
          priceYear,
          Order,
          Discount,
          Appliances,
          Phone,
          Notebook,
          Otp,
        ],
        synchronize: true,
        autoLoadModels: true,
        logging: false,
      }),
    }),
    CategoryModule,
    ProductModule,
    UsersModule,
    CurrencyModule,
    PriceYearModule,
    DescriptionModule,
    MediaModule,
    DiscountModule,
    OrderModule,
    SearchHistoryModule,
    AppliancesCharacteristicsModule,
    PhoneCharacteristicsModule,
    NotebookCharacteristicsModule,
    FilesModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
