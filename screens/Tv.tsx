import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { tvApi } from "../api";
import Loader from "../components/Loader";
import HList from "../components/HList";

const Tv = () => {

  const [refreshing, setRefreshing] = useState(false);

  const queryClient = useQueryClient();

  const { isLoading: todayLoading, data: todayData } = useQuery({
    queryKey: ["tv", "today"],
    queryFn: tvApi.TvairingToday
  });
  
  const { isLoading: topLoading, data: topData } = useQuery({
    queryKey: ["tv", "top"],
    queryFn: tvApi.TvtopRated
  });

  const { isLoading: trendingLoading, data: trendingData } = useQuery({
    queryKey: ["tv", "trending"],
    queryFn: tvApi.Tvtrending
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries({queryKey: ["tv"]});
    setRefreshing(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="Trending TV" data={trendingData.results} />
      <HList title="Airing Today" data={todayData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};
export default Tv;