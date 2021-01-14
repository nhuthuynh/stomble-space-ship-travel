import AppError from "./AppError";

export namespace SpaceShipError {

    export class SpaceShipInvalidError extends AppError {
        constructor() {
            super( 400, `Space Ship data is invalid; name, spaceShipModel, location and status are required.` );
        }

        public static create(): SpaceShipInvalidError {
            return new SpaceShipInvalidError();
        }
    }

    export class SpaceShipNotFoundError extends AppError {
        constructor() {
            super( 400, `Space Ship is not found.` );
        }

        public static create(): SpaceShipNotFoundError {
            return new SpaceShipNotFoundError();
        }
    }

    export class SpaceShipIdRequiredError extends AppError {
        constructor() {
            super( 400, `Space Ship id is required.` );
        }

        public static create(): SpaceShipIdRequiredError {
            return new SpaceShipIdRequiredError();
        }
    }

    export class SpaceShipStatusNotFoundError extends AppError {
        constructor( status: string ) {
            super( 400, `Space ship status is not correct, required one of these values: ${status}` );
        }

        public static create( status: string ): SpaceShipStatusNotFoundError {
            return new SpaceShipStatusNotFoundError( status );
        }
    }

    export class SpaceShipTravelWithInvalidStatusError extends AppError {
        constructor( status: string ) {
            super( 400, `Only ${status} space ship can travel.` );
        }

        public static create( status: string ): SpaceShipTravelWithInvalidStatusError {
            return new SpaceShipTravelWithInvalidStatusError( status );
        }
    }
}