const jwt = require('jsonwebtoken');

export default class Token {

    private static seed: string = 'seed-de-app-secreto';

    static comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject ) => {

            jwt.verify( userToken, this.seed, ( err:any, decoded:any ) =>{

                if(err) {
                    reject();
                } else {
                    resolve(decoded);
                }

            })

        })

    }

}