import Feed from "./Feed";
import {
  FeaturedActions,
  TopArtistsActions,
  ViralIndiaActions,
  newReleasesActions,
  recentlyActions,
  topHitsAction,
} from "../../store/FeedActions";
import { profileActions } from "../../store/profile-slice";
import useFetch from "../../Hooks/FetchHook";
import { useEffect, useState } from "react";

const FeedLoad = () => {
  const [loading, setLoading] = useState(true);
  const requestArray = [
    {
      url: "https://api.spotify.com/v1/browse/new-releases",
      saveData: newReleasesActions,
    },
    {
      url: `https://api.spotify.com/v1/me/player/recently-played?limit=50&before=${Date.now()}`,
      saveData: recentlyActions,
    },
    {
      url: "https://api.spotify.com/v1/browse/featured-playlists?locale=in_IN",
      saveData: FeaturedActions,
    },
    {
      url: "https://api.spotify.com/v1/search?q=top+hits&type=album%2Cplaylist&market=IN",
      saveData: topHitsAction,
    },
    {
      url: "https://api.spotify.com/v1/search?q=viral+india&type=playlist&market=IN",
      saveData: ViralIndiaActions,
    },
    {
      url: "https://api.spotify.com/v1/me/top/artists",
      saveData: TopArtistsActions,
    },
    {
      url: "https://api.spotify.com/v1/me",
      saveData: profileActions.setMe,
    },
  ];

  const isLoaded = useFetch(requestArray);

  useEffect(() => {
    if (isLoaded) setLoading(true);
    else setLoading(false);
  }, [isLoaded]);

  if (!loading) {
    return <Feed />;
  }
};

export default FeedLoad;
