import {StorageEntity} from "../domain/model/storage.entity.js";

export class StorageAssembler {

    static toEntityFromResource(resource) {
        return new StorageEntity({...resource});
    }

    static toResourceFromEntity(entity) {
        return {
            id: entity.id,
            cellarId: entity.cellarId,
            wineType: entity.wineType,
            wineId: entity.wineId,
            wineName: entity.wineName,
            quantity: entity.quantity,
            registeredAt: entity.registeredAt

        };
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200){
            console.error(`${response.status} ${response.statusText}`);
            return []
        }
        let resources = response.data instanceof Array ? response.data : response.data['Storage-items'];

        return resources.map(resource => this.toEntityFromResource(resource));

    }
}