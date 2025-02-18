import dotenv from 'dotenv';
import dotenvParse from 'dotenv-parse-variables'

import {fileURLToPath} from 'url'
const __dirname = fileURLToPath(new URL('.', import.meta.url));

let env = dotenv.config({
    path:__dirname + '.env'
});

if (env.error) throw env.error;

env = dotenvParse(env.parsed);

let config = {
    server:{
        port:process.env.PORT,
    },
    db:{
        dialect:'mongodb',
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        name:process.env.DB_NAME
    },
    dirname: __dirname,
}

export default config;



