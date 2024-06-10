import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, Platform, Share} from "react-native";
import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

import { Movie, moviesApi, TV, tvApi } from "../api";
import { makeImgPath } from "../utils";
import Poster from "../components/Poster";
import Loader from "../components/Loader";

type RootStackParamList = {
  Detail: Movie | TV
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Detail:React.FC<DetailScreenProps> = ({navigation: { setOptions }, route: { params }}) => {

  const isMovie = "original_title" in params;

  const { isLoading, data} = useQuery({
    queryKey: [isMovie ? "movies" : "tv", params.id],
    queryFn: isMovie ? moviesApi.MovieDetail : tvApi.TvDetail
  })

  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;

    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share" color="gray" size={24}/>
    </TouchableOpacity>
  )
  
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "TV",
    })
  }, []);

  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYTLink = async (videoID : string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    await WebBrowser.openBrowserAsync(baseUrl);
  }

  return (
    <Container>

      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
          blurRadius={1}
        />

        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>

      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video: any) =>
          video.site === "YouTube" ? (
            <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
              <Ionicons name="logo-youtube" color="white" size={24} />
              <BtnText>{video.name}</BtnText>
            </VideoBtn>
          ) : null
        )}
      </Data>

    </Container>
  )
};

const Container = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 3}px;
  justify-content: flex-end;
  padding: 10px 20px;
`;

const Background = styled.Image`
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const Title = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 30px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0px 20px;
  margin-bottom: 30px;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 10px;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

export default Detail;