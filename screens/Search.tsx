import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components/native";
import { moviesApi } from "../api";

const Search = () => {

  const [query, setQuery] = useState("");

  const onChangeText = (text: string) => setQuery(text);

  console.log(query);

  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
      />
    </Container>
  );
};

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: ${props => props.theme.mainBgColor};
  color: ${props => props.theme.textColor};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 25px auto 10PX;
`;

export default Search;