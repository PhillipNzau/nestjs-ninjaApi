import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjaService: NinjasService){}
    // Get /ninjas?type=fast -> []
    @Get()
    @UseGuards(BeltGuard)
    getNinjas(@Query('weapon') weapon:'stars'|'nunchucks') {
        return this.ninjaService.getNinjas(weapon)
    }
    // Get /ninjas -> []
    @Get(':id')
    getOneNinja(@Param('id', ParseIntPipe) id:number) {
        try {
            return  this.ninjaService.getNinja(id)
        } catch (err){
            throw new NotFoundException()
        }
    }
    // Post /ninjas
    @Post()
    createNinja(@Body(new ValidationPipe) createNinjaDto:CreateNinjaDto){
        return this.ninjaService.createNinja(createNinjaDto)
    }
    // Put /ninjas/:id --> {}
    @Put(':id')
    updateNinja(@Param('id', ParseIntPipe) id:number, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjaService.updateNinja(id, updateNinjaDto)
    }
    // Put /ninjas/:id --> {}
    // @Patch(':id')
    // updateANinja(@Param('id') id:string){
    //     return {};
    // }
    // Delete /ninjas/:id
    @Delete(':id')
    removeNinja(@Param('id', ParseIntPipe) id:number){
        return  this.ninjaService.removeNinja(id)
    }
}

