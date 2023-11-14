import * as net from 'net';

const PIPE_NAME = 'voice-client';
const PIPE_PATH = '\\\\.\\pipe\\';

interface IPCData {
    type: string,
    message: string
}

export const mainProcessConnection = {
    startConnection: () => {
        return new Promise<string>((resolve) => {
            try {
                console.log('IPC: Starting connection...');
                resolve('connected to server!');
                const client = net.createConnection(PIPE_PATH + PIPE_NAME, () => {
                    try {
                        console.log('connected to server!');
                        
                        connectMediaSoup();
                    } catch (e) {
                        console.log(e);
                    }
                    
                });
    
                client.on('data', (data: IPCData) => {
                    handleIPCMessage(data);
                });
    
                client.on('end', () => {
                    console.log('disconnected from server');
                });

                client.on('error', (err) => {
                    console.log("Error while creating pipe: " + err);
                });
            } catch (error) {
                console.log(error)
            }
        })
    }
};

const connectMediaSoup = () => {
}

// Type switch, do different things when different types of messages are received
const handleIPCMessage = (data: IPCData) => {

    // Convert data buffer to string and print in console
    data = JSON.parse(data.toString());
    console.log(data);

    switch (data.type) {
        case 'info':
            console.log(data.message);
            break;
        case 'command':
            handleIPCCommand(data.message);
            break;
        default:
            console.log('Unknown message type received');
    }
}

const handleIPCCommand = (command: string) => {
    switch (command) {
        case 'talk':
            console.log('Mic unmuted!');
            break;
        case 'mute':
            console.log('Mic muted!');
            break;
        default:
            console.log('Unknown command received');
    }
}