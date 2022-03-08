import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/songAtom';
import useSoptify from './useSoptify';

const useSongInfo = () => {
    const spotifyApi = useSoptify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/vi/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then(res => res.json());

                setSongInfo
            }
        }

        fetchSongInfo();
    }, [currentTrackId, spotifyApi]);

    return songInfo;

}

export default useSongInfo
