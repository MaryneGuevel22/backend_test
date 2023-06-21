import { Body, Controller, Get, Param, Post ,SetMetadata , Delete , Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Put} from '@nestjs/common';
import {Logger} from '@nestjs/common'



import { DeclarerService } from './declarerEM.service';
import { Declarerem } from 'src/enteties/declarerem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeclaredDto } from 'src/common/dtos/declare.dto';
import { ModifiedDeclaredDto } from 'src/common/dtos/modify-declared.dto';

@Controller('declared')
export class DeclarerController {
constructor(private declaredService: DeclarerService){}

@Post()
createOffre(
    @Body() createdeclaredDto:CreateDeclaredDto,
    ): Promise <Declarerem> {
    console.log('====>',createdeclaredDto)
return this.declaredService.createOffre(createdeclaredDto);
}

@Get()
  async findAll(): Promise<Declarerem[]> {
    return this.declaredService.getall();
  }


  @Get('byid/:id')

getOffresById(@Param('id') id:number,

): Promise<Declarerem>{
    console.log(id)
    return this.declaredService.getOffresById(id)
  }
  @Put(':id')
  async modifyOffre(@Param('id') declaredId: number, @Body() modifiedDeclaredDto: ModifiedDeclaredDto): Promise<Declarerem> {
    return await this.declaredService.modifyOffre(declaredId, modifiedDeclaredDto);
  }
  @Patch('/:id')

updateOffreStatus(
    @Param('id')id:number,
): Promise<Declarerem>{
return this.declaredService.updateDeclaredStatus(id);
} 
  
}

  

