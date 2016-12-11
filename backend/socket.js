/**
 * Socket.IO configuration
 */

import server from 'app';
import soc from 'socket.io';
const io = soc(server);

io.on('connection', () => {
    // connected to client
});

export {io};
