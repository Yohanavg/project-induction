import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import {MongooseModule} from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
      }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    PokemonModule,
    StatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
