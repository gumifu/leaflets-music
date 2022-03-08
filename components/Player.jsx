import { ReplyIcon, SwitchHorizontalIcon, } from '@heroicons/react/outline';
import { FastForwardIcon, PauseIcon, PlayIcon, RewindIcon, VolumeUpIcon ,VolumeOffIcon} from '@heroicons/react/solid';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSongInfo from '../hooks/useSonginfo';
import useSoptify from '../hooks/useSoptify';

const Player = () => {
    const spotifyApi = useSoptify();
    const { data: session } = useSession();
    // const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    // const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                console.log('Now playing', data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false)
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    }

    // useEffect(() => {
    //     if (spotifyApi.getAccessToken() && !currentTrackId) {
    //         fetchCurrentSong();
    //         setVolume(50);
    //     }
    // }, [currentTrackIdState,spotifyApi,session]);

    useEffect(() => {
        debounceAdjustVolume(volume);
    }, [volume]);

    const debounceAdjustVolume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err)=> { });
        },500),[]
    );

  return (
      <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:p-8'>
          {/* left img... */}
          <div className="flex items-center space-x-4">
            <img src={songInfo?.album.images?.[0]?.url} alt="" className="hidden md:inline h-10 w-10" />
            <div className="">
                <h3 className="">{songInfo?.name}</h3>
                <p className="">{songInfo?.artists?.[0]?.name}</p>
            </div>
          </div>
          {/* middle */}
          <div className="flex items-center justify-evenly">
              <SwitchHorizontalIcon className='button' />
              <RewindIcon className='button' />
              {/* {isPlaying ? Player( */}
                <PauseIcon onClick={handlePlayPause} className='button w-10 h-10'/>
              {/* ) : (
                <PlayIcon onClick={handlePlayPause} className='button w-10 h-10'/>
              )} */}
              <FastForwardIcon className='button' />
              <ReplyIcon className='button'/>
          </div>
          {/* right */}
          <div className="flex items-center space-x-3 md:space-x-4  justify-end pr-5">
              {/* <VolumeDownIcon  className='button/> */}
              <VolumeOffIcon className='button' onClick={()=>volume>0 && setVolume(volume - 10)}/>
              <input type="range" value={volume} onChange={e=>setVolume(Number(e.target.value))}  className="w-14 md:w-28" min={0} max={100}/>
              <VolumeUpIcon className='button' onClick={()=>volume<100 && setVolume(volume+10)}/>

          </div>
    </div>
  )
}

export default Player
