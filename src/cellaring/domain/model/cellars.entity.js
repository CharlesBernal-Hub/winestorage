export class CellarsEntity {
    _id;
    _name;
    _wineType
    _capacity

    constructor({id=null,name='', wineType='', capacity=''}={}) {
        this._id = id;
        this._name = name;
        this._wineType = wineType;
        this._capacity = capacity;
    }

    get id() {
        return this._id;
    }
    set name(name) {
        this._name = name;
    }
    get wineType() {
        return this._wineType;
    }
    get capacity() {
        return this._capacity;
    }

}