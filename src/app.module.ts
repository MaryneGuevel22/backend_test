import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './database/typeorm.config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { DeclarerModule } from './modules/declarerEM/declarerEM.module';
import { AnalyseemModule } from './modules/analyseem/analyseem.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    DeclarerModule,
    AnalyseemModule
  
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
 
 
    

})
export class AppModule {}