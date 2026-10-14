import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const cellarsEndpointpath = import.meta.env.VITE_CELLARS_ENDPOINT_PATH;
const storageEndpointPath = import.meta.env.VITE_STORAGE_ITEMS_ENDPOINT_PATH;

export class CellaringApi extends BaseApi {

    #cellarsEndpoint;
    #storageEndpoint;

    constructor(){
        super();
        // AQUÍ ESTÁ LA CORRECCIÓN CRÍTICA: Se envía 'this' en lugar de 'this.#storageEndpoint'
        this.#storageEndpoint = new BaseEndpoint(this, storageEndpointPath);
        this.#cellarsEndpoint = new BaseEndpoint(this, cellarsEndpointpath);
    }

    getCellar(){
        return this.#cellarsEndpoint.getAll();
    }
    getCellarById(id){
        return this.#cellarsEndpoint.getById(id);
    }
    createCellar(resource){
        return this.#cellarsEndpoint.create(resource);
    }
    updateCellar(resource){
        return this.#cellarsEndpoint.update(resource.id, resource);
    }
    deleteCellar(id){
        return this.#cellarsEndpoint.delete(id);
    }
    getStorage(){
        return this.#storageEndpoint.getAll();
    }
    getStorageById(id){
        return this.#storageEndpoint.getById(id);
    }
    createStorage(resource){
        return this.#storageEndpoint.create(resource);
    }
    updateStorage(resource){
        return this.#storageEndpoint.update(resource.id, resource);
    }
    deleteStorage(id){
        return this.#storageEndpoint.delete(id);
    }
}