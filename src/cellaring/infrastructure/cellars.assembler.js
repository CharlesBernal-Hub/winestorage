import {CellarsEntity} from '../domain/model/cellars.entity.js';

export class CellarsAssembler {

    static toEntityFromResource(resource) {
        return new CellarsEntity({...resource});
    }

    static toResourceFromEntity(entity) {
        return {
            id: entity.id,
            name: entity.name,
            wineType: entity.wineType,
            capacity: entity.capacity
        };
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200){
            console.error(`${response.status}: ${response.statusText}`);
            return [];

        }

        let resources = response.data instanceof Array? response.data : response.data['cellars'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}