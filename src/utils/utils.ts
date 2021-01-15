const MONGOOSE_OBJECTID_PATTERN = /^[0-9a-fA-F]{24}$/;

const utils = {
    isValideObjectId: ( id: string ) => {
        return id.match( MONGOOSE_OBJECTID_PATTERN );
    },
    getValuesFromEnum: ( enumObject: any ) => {
        const values = Object.values( enumObject );
        return values.splice( 0, Math.ceil( values.length / 2 ) );
    }
};

export default utils;