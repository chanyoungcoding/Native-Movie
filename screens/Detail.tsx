import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet} from "react-native";
import styled from "styled-components/native";
import { useQuery } from "@tanstack/react-query";

import { Movie, moviesApi, TV, tvApi } from "../api";
import { makeImgPath } from "../utils";
import Poster from "../components/Poster";

type RootStackParamList = {
  Detail: Movie | TV
}

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Detail:React.FC<DetailScreenProps> = ({navigation: { setOptions }, route: { params }}) => {

  const {isLoading: moviesLoading, data: moviesData} = useQuery({
    queryKey: ["movies", params.id],
    queryFn: moviesApi.MovieDetail,
    enabled: "original_title" in params
  });

  const {isLoading: tvLoading, data: tvData} = useQuery({
    queryKey: ["tv", params.id],
    queryFn: tvApi.TvDetail,
    enabled: "original_name" in params
  });
  
  useEffect(() => {
    setOptions({
      title: "original_title" in params ? params.original_title : params.original_name
    })
  }, []);

  console.log("movies", moviesData);
  console.log("tv", tvData);

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
      <Overview>{params.overview}</Overview>
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
`;

export default Detail;