import Server from './classes/server';

async function main() {
    const server = new Server();
    await server.listen();
}

main();