const MONGOOSE_OBJECTID_PATTERN = /^[0-9a-fA-F]{24}$/;
const utils = {
    isValideObjectId: ( id: string ) => {
        return id.match( MONGOOSE_OBJECTID_PATTERN );
    }
};

export default utils;