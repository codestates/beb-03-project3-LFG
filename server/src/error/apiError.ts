import {logger} from "../utils/logger";

export interface ApiError {
    code: number,
    msg: string,
}

export function badRequest(msg: string, error?: any): ApiError {
    if(error){
        logger.http(error);
    }
    return {
        code : 400,
        msg,
    }
}

export function internal(msg: string, error?: any): ApiError {
    if(error){
        logger.error(error);
    }
    return {
        code : 500,
        msg,
    }
}