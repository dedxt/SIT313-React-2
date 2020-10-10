import HapiSwagger from 'hapi-swagger';
import 'dotenv/config';

const swaggerOptions = {
    pathPrefixSize: 2,
    info: {
        'title': `${process.env.APP_NAME} Backend`,
        'description': `${process.env.APP_NAME} Backend APIs.`,
        'version': `${process.env.npm_package_version}`
    },
    documentationPath: "/swagger",
    
};

export function register(server, options) {
    server.register({
        plugin: HapiSwagger,
        options: swaggerOptions
    }, {}, (err) => {
        if (err) server.log(['error'], 'hapi-swagger load error: ' + err)
        else server.log(['info'], 'hapi-swagger interface loaded')
    });
}

export const name = 'swagger-plugin';
