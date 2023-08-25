"use client"
import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

interface User {
  id: string;
  name: string;
  currentSpaceId: string;
}

interface Space {
  id: string;
  title: string;
  userIds: string[];
  users: User[];
}
const Component: React.FC = () => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [user, setuser] = useState({ id: "", name: "", currentSpaceId: "" })

  console.log({user});
  

  useEffect(() => {
    if (socket) return
    const s = io("http://localhost:4000/");
    setSocket(s)

    s.on('connect', () => {
      console.log("connect");
      setuser(prevUser => ({ ...prevUser, id: s.id }))
    });

    
    s.on('create_space_response', (newSpace: Space) => {
      setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
    });

    s.on('space_updated_response', (updatedSpace: Space) => {
      setSpaces((prevSpaces) =>
        prevSpaces.map((space) =>
          space.id === updatedSpace.id ? updatedSpace : space
        )
      );
    });

    
    s.on('on_disconnected', (data) => {
      const disconnectedUserId = data.userid;
      const currentSpaceId = data.currentSpace;
    
      console.log("on_disconnected", disconnectedUserId, currentSpaceId);
    
      setSpaces(prevSpaces => {
        return prevSpaces.map(space => {
          console.log(space.id, currentSpaceId);
          
          if (space.id === currentSpaceId) {
            console.log("existing space", space);
            
            const updatedSpace = {
              ...space,
              userIds: space.userIds.filter(id => id !== disconnectedUserId),
              users: space.users.filter(user => user.id !== disconnectedUserId)
            };

            console.log("updated space", updatedSpace);
            return updatedSpace;
          }
          return space;
        });
      });
    });


    return () => {
      s.off('create_space_response');
      s.off('space_updated_response');
    };
  }, []);

  const logout = () => {
    console.log(socket?.connected);

    // Find the space the user was in
    const userSpace = spaces.find(space => space.id === user.currentSpaceId);
    console.log({ userSpace });

    if (userSpace) {
      // Remove the user from the space
      userSpace.userIds = userSpace.userIds.filter(id => id !== user.id);
      userSpace.users = userSpace.users.filter(u => u.id !== user.id);

      // Emit the updated space to the server
      socket?.emit('leave_space', userSpace);

      // Update the state
      setSpaces(prevSpaces =>
        prevSpaces.map(space =>
          space.id === user.currentSpaceId ? userSpace : space
        )
      );

      
      // Clear the user's current space
      setuser(prevUser => ({ ...prevUser, currentSpaceId: '' }));
    }

    // socket?.disconnect();
    // console.log(socket?.connected);
  }

  const connect = () => {
    socket?.connect();
  }

  const createSpace = () => {
    const spaceid = (Math.floor(Math.random() * 100000)).toString();
    console.log('create', spaceid);

    const newSpace: Space = {
      id: spaceid,
      title: "New Space",
      userIds: [],
      users: [],
    };

    socket?.emit('create_space', newSpace);
  };

  const joinSpace = (space: Space) => {
    console.log('joinspace', space.id);

    if (space.id === user.currentSpaceId) return console.log('already in space');

    const newUser: User = {
      ...user,
      currentSpaceId: space.id,
    };
    setuser(newUser)

    if (user.currentSpaceId) {

      const prevSpaceIndex = spaces.findIndex((s) => s.id === user.currentSpaceId);
      
      if (prevSpaceIndex !== -1) {
        const prevSpace = { ...spaces[prevSpaceIndex] };
        prevSpace.userIds = prevSpace.userIds.filter(id => id !== user.id);
        prevSpace.users = prevSpace.users.filter(u => u.id !== user.id);
        socket?.emit('join_space', prevSpace);
      }
    }

    space.userIds.push(newUser.id);
    space.users.push(newUser);
    socket?.emit('join_space', space);
  }

  return (
    <div>

      <button onClick={logout}>Logout</button>
      <br />
      <button onClick={connect}>join</button>
      <br />
      <button onClick={createSpace}>Create Space</button>


      <ul>
        {spaces.map((space) => (
          <li key={space.id}>
            {space.title} id: {space.id}
            <button onClick={() => joinSpace(space)}>Join Space</button>
            <ul>
              {space.users.map((user) => (
                <li key={user.id}>{user.name} id: {user.id}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Component;
