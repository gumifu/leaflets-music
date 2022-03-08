import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState,playlistState } from '../atoms/playlistAtom';
import useSoptify from '../hooks/useSoptify';
import Songs from './Songs';

const colors =[
        "from-indigo-500",
        "from-blue-500",
        "from-green-500",
        "from-red-500",
        "from-yellow-500",
        "from-pink-500",
        "from-purple-500",
    ];


const Center = () => {
    const spotifyApi = useSoptify();
    const { data: session } = useSession();
    const [color, setColor] = useState('');
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body);
        }).catch((err) => console.log('something went wrong!', err));
    }, [spotifyApi, playlistId]);

    console.log(playlist);

  return (
      <div className='flex-grow h-screen overflow-y-scroll  scrollbar-hide'>
          <header className=" absolute top-5 right-8">
              <div className=" flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
              onClick={signOut}
              >
                  <img src={session?.user.image} alt="" className="rounded-full w-10 h-10 " />
                  <h2 className="">{session?.user.name}</h2>
                  <ChevronDownIcon className='h-5 w-5'/>
              </div>
          </header>
{/* music Item */}
          <section className={` flex items-end space-x-7 w-full bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
              <img src={playlist?.images?.[0]?.url} alt="" className="h-44 w-44 shadow-2xl" />
              <div className="">
                  <p className="">プレイリスト</p>
                  <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
              </div>
          </section>

          <div className="">
                <Songs/>
          </div>
      </div>
  )
}

export default Center
