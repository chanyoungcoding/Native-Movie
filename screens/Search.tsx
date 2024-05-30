import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components/native";

import HList from "../components/HList";
import Loader from "../components/Loader";
import { moviesApi, tvApi } from "../api";


const Search = () => {

  const [query, setQuery] = useState("");

  const { isLoading: moviesLoading, data: moviesData, refetch: searchMovies } = useQuery({
    queryKey: ["searchMovies", query],
    queryFn: moviesApi.MoviesSearch,
    enabled: false
  });

  const {isLoading: tvLoading, data: tvData, refetch: searchTv } = useQuery({
    queryKey: ["searchTv", query],
    queryFn: tvApi.TvSearch,
    enabled: false
  });

  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
        {moviesLoading || tvLoading ? <Loader /> : null}
        {moviesData ? (
          <HList title="Movie Results" data={moviesData.results} />
        ) : null}
        {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
};

const Container = styled.ScrollView`
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const SearchBar = styled.TextInput`
  background-color: ${props => props.theme.mainBgColor};
  color: ${props => props.theme.textColor};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 25px auto 10PX;
`;

export default Search;