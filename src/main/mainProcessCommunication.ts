import * as net from 'net';

const PIPE_NAME = 'voice-client';
const PIPE_PATH = '\\\\.\\pipe\\';

export const mainProcessConnection = {
    startConnection: () => {
        try {
            console.log('starting connection');
            const client = net.createConnection(PIPE_PATH + PIPE_NAME, () => {
                console.log('connected to server!');
            });

            client.on('data', (data) => {
                console.log(JSON.parse(data.toString()));
            });

            client.on('end', () => {
                console.log('disconnected from server');
            });
        } catch (error) {
            console.log(error)
        }
    }
};