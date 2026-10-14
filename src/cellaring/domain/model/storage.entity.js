export class StorageEntity {
    _id;
    _cellarId;
    _wineType;
    _wineName;
    _quantity;
    _registeredAt;

    constructor({id=null,cellarId=null,wineType = '',wineName = '',quantity = null,registeredAt=null}={}) {
        this._id = id;
        this._cellarId = cellarId;
        this._wineType = wineType;
        this._wineName = wineName;
        this._quantity = quantity;
        this._registeredAt = registeredAt;


    }

    get id() {
        return this._id;
    }
    get cellarId() {
        return this._cellarId;
    }
    get wineType() {
        return this._wineType;
    }
    get wineName() {
        return this._wineName;
    }
    get quantity() {
        return this._quantity;
    }
    get registeredAt() {
        return this._registeredAt;
    }


}