import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StatsModule } from './stats/stats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BuscalibreModule } from './buscalibre/buscalibre.module';

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
    AuthModule,
    UsersModule,
    BuscalibreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
