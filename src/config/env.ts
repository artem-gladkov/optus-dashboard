export const getEnvVariable = (key: string) => {
    if (process.env[key] === undefined) {
        throw new Error(`Env variable ${key} is required`);
    }
    return process.env[key] || "";
};

export const isProd = () => {
    if(
        getEnvVariable("REACT_APP_NODE_ENV") === "development" && 
        getEnvVariable("NODE_ENV") === "production"
    ){
        return false;
    };
    return (
        getEnvVariable("REACT_APP_NODE_ENV") === "production" || 
        getEnvVariable("NODE_ENV") === "production"
    );
};