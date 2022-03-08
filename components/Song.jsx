import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSoptify from '../hooks/useSoptify';
import { millsToMunutesAndSeconds } from '../lib/time';

const Song = ({order, track}) => {
    const spotifyApi = useSoptify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

    const playSong = () => {
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri],
        })
    }

  return (
      <div className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer'
      onClick={playSong}
      >
          <div className="flex space-x-4 items-center ">
              <p className="">{order+1}</p>
              <img src={track.track.album.images[0].url} alt="" className='h-10 w-10 ' />
              <div className="">
              <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
              <p className="w-40">{track.track.artists[0].name}</p>
              </div>
          </div>
          <div className="flex items-center justify-between ml-auto md:ml-0">
              <p className="w-40 hidden md:inline">{ track.track.album.name}</p>
              <p className="">{millsToMunutesAndSeconds(track.track.duration_ms)}</p>
              {/* <p className="">{track.track.duration_ms}</p> */}
          </div>
    </div>
  )
}

export default Song
