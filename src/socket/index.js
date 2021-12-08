import Peer from 'peerjs';
import { Game } from '..';
export const socket = io();

//  start the game once socket is connected
socket.on('connect', () => {
  console.log('socket connection ', socket.id);

  let buttons = document.querySelector('.buttonsAndForm');
  if (buttons) buttons.style.display = 'flex';
  if (window.location.pathname === '/office') {
    window.location.replace(window.location.origin);

  }else window.game = new Game();

  // makes the peer once socket is connected
  // window.peer = makePeer(socket.id)
});

// socket.on('disconnect', () => {
//   console.log(' i disconnected');
// });

export const makePeer = socketId => {
  const peer = new Peer(socket.id, {
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          url: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com',
        },
      ],
      sdpSemantics: 'unified-plan',
    },
  });

  peer.on('open', id => {
    console.log('My peer ID is: ' + id);
    // window.peer = peer;
  });
  return peer;
};
