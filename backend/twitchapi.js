/**
 * Twitch api backend. All the connections to twitch are here
 */

import tmi from 'tmi.js';
import credentials from 'credentials.json';
import {io} from 'backend/socket';
import Follower from 'models/follower';

const client = new tmi.client(credentials.tmi);
const headers = {
    'Client-ID': credentials.tmi.options.clientId,
};
const twBaseUrl = 'https://api.twitch.tv/kraken';

client.connect();

// chat example
client.on('chat', (channel, userstate, message, self) => {
    // ignore own messages
    if (self) return;

    // push message to client
    io.emit('chat', `${userstate['display-name']}: ${message}`);
});

export {client};
