import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
    private ninjas = [
        {id: 0,name:'ninjaA', weapon: 'stars'},
        {id: 1,name:'ninjaB', weapon: 'nunchucks'}
    ];

    // Get all ninja with option of filter by weapon
    getNinjas(weapon?: 'stars'|'nunchucks'){
        if(weapon) {
            return this.ninjas.filter((ninjas) => ninjas.weapon === weapon)
        }

        return this.ninjas
    }

    // Get a single ninja
    getNinja(id:number){
        const ninja = this.ninjas.find((ninja) => ninja.id === id)

        if(!ninja) {
            throw new Error('Ninja not found')
        }

        return ninja
    }

    // Create Ninja
    createNinja(createNinjaDto: CreateNinjaDto){
        const newNinja = {
            ...createNinjaDto,
            id:Date.now(),
        }
        this.ninjas.push(newNinja)
        return newNinja
    }

    // Update Ninja
    updateNinja(id: number, updateNinjaDto: UpdateNinjaDto){
        this.ninjas = this.ninjas.map((ninja)=> {
            if(ninja.id === id) {
                return {...ninja, ...updateNinjaDto}
            }
            return ninja
        });
        return this.getNinja(id)
    }

    // Remove Ninja
    removeNinja(id:number) {
        const toBeRemoved = this.getNinja(id)
        this.ninjas = this.ninjas.filter((ninja) => ninja.id !==id)
        return toBeRemoved;
    }

}
