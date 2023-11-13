import { Socket } from 'socket.io-client';
import { RtpCapabilities } from 'mediasoup-client/lib/RtpParameters';
import { useRef } from 'react';
import { Device } from 'mediasoup-client';
import {
    IceParameters,
    IceCandidate,
    DtlsParameters,
    Transport
} from 'mediasoup-client/lib/Transport';

export interface ServerTransportParams {
    id: string;
    iceParameters: IceParameters;
    iceCandidates: IceCandidate[];
    dtlsParameters: DtlsParameters;
}

export const useMediasoup = () => {
    const rtpCapabilities = useRef<RtpCapabilities>();
    const device = useRef<Device>();
    const producerTransport = useRef<Transport>();

    const connectToChannel = async (socket: Socket, stream: MediaStream) => {
        console.log('(1/12) connect to voice channel!', {stream});
        socket.emit('get-rtp-capabilities', async (serverRtpCapabilities: RtpCapabilities) => {
            if (serverRtpCapabilities === undefined) {
                console.log('serverRtpCapabilities is undefined');
                return;
            }

            rtpCapabilities.current = serverRtpCapabilities;
            
            device.current = new Device();
            await device.current.load( { routerRtpCapabilities: rtpCapabilities.current } );
            console.log('(2/12) Device loaded!');

            await createSendTransport(socket);
            await produce(stream);
        });
    };

    const createSendTransport = (socket: Socket) => {
        return new Promise<void>((resolve) => {
            socket.emit(
                'create-webrtc-transport',
                async (serverParams: ServerTransportParams) => {
                    console.log('(3/12) create-webrtc-transport');
                    const transport = device.current!.createSendTransport(serverParams);
                    producerTransport.current = transport
                    resolve()
                    console.log('(4/12) transport created!');
                    transport.on('connect', async ({ dtlsParameters }, callback) => {
                        console.log('(5/12) transport connect');

                        if (!producerTransport.current) {
                            console.log('producerTransport is undefined');
                            return;
                        }

                        console.log('transport connect emit');
                        await socket.emit(
                            'transport-connect',
                            { dtlsParameters, transportId: producerTransport.current.id },
 
                        );
                        console.log('transport-connect callback');
                        callback()
                    });

                    transport.on('produce', async ({ kind, rtpParameters }, callback) => {
                        console.log('producer transport producing');
                        socket.emit('transport-produce', { kind, rtpParameters }, (id: string) => {
                            console.log('transport-produce callback');
                            callback({ id });
                        });
                    });

                    transport.on('connectionstatechange', (state) => {
                        console.log('transport connectionstatechange');
                        switch (state) {
                            case 'connecting':
                                console.log('transport connecting');
                                break;
                            case 'connected':
                                console.log('transport connected');
                                break;
                            case 'failed':
                                console.log('transport failed');
                                transport.close();
                                break;
                            default:
                                break;
                        }
                    });
                }
            );
        });
    };

    const produce = async (stream: MediaStream) => {
        const streamTracks = stream.getTracks();
        const audioTrack = streamTracks.find((track) => track.kind === 'audio');
        const videoTrack = streamTracks.find((track) => track.kind === 'video');
        if (audioTrack && producerTransport.current) {
            const audioProducer = await producerTransport.current.produce({track: videoTrack });
            console.log('audioProducer created!');
            audioProducer?.on('trackended', () => {
                console.log('track ended');
            });
        } else {
            console.log("no audio track or producer transport")
        }
    };

    return {
        connectToChannel
    };
};
