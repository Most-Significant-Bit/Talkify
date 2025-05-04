import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PodcastCard from "../components/PodcastCard";
import Navbar from "../components/Navbar";

import { useEpisodeStore } from "../store/episodeStore";
import axios from "axios";

const CLIENT_URL = "http://localhost:5000/api/episode";

axios.defaults.withCredentials = true;

const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  padding-top: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${({ box, theme }) =>
    box &&
    `
background-color: ${theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`}
  background-color: ${({ theme }) => theme.bg};
  border-radius: 10px;
  padding: 20px 30px;
`;
const Topic = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @maedia (max-width: 768px) {
    font-size: 18px;
  }
`;
const Span = styled.span`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 14px;
  }
  color: ${({ theme }) => theme.primary};
  &:hover {
    transition: 0.2s ease-in-out;
  }
`;
const Podcasts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  padding: 18px 6px;
  //center the items if only one item present
  @media (max-width: 550px) {
    justify-content: center;
  }
`;

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [motivational, setMotivational] = useState([]);
  const [love, setLove] = useState([]);
  const [horror, setHorror] = useState([]);
  const [crime, setCrime] = useState([]);


  const fetchData = async () => {
    try {
      const allResponse = await axios.get(`${CLIENT_URL}/getAll`);
      
      // Sort by favorites (highest to lowest), then take top 7
      const sortedData = allResponse.data
        .sort((a, b) => b.favorites - a.favorites)
        .slice(0, 7);
    
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
    
  
    const categorySetters = {
      love: setLove,
      motivational: setMotivational,
      horror: setHorror,
      comedy: setComedy,
      crime : setCrime
    };
  
    const categoryPromises = Object.keys(categorySetters).map(async (category) => {
      try {
        const res = await axios.get(`${CLIENT_URL}/search/?category=${category}`);
        categorySetters[category](res.data);
      } catch (err) {
        console.error(`Error fetching ${category}:`, err);
      }
    });
  
    await Promise.all(categoryPromises);
  };
  

  // useEffect to fetch once on mount
  useEffect(() => {
    fetchData();
  }, []); // ✅ empty dependency array so it runs once

  return (
    <>
      <Navbar />
      <DashboardMain>
        <Container>
          <Topic>
            Most Popular
            <Link
              to={`/showpodcasts/mostpopular`}
              style={{ textDecoration: "none" }}
            >
              <Span>Show All</Span>
            </Link>
          </Topic>
          <Podcasts>
            {data.length > 0 ? (
              data.map((item, index) => {
                // console.log("DATA ITEM:", index, item); // 👈 see what's inside!
                return <PodcastCard key={index} data={item} id={item?._id} />;
              })
            ) : (
              <p>No episodes found.</p>
            )}
          </Podcasts>
        </Container>


        <Container>
          <Topic>
            Love
            <Link to={`/showpodcasts/love`} style={{ textDecoration: "none" }}>
              <Span>Show All</Span>
            </Link>
          </Topic>
          <Podcasts>
            {love.length > 0 ? (
              love.map((item, index) => {
                return <PodcastCard key={index} data={item} id={item?._id} />;
              })
            ) : (
              <p>No episodes found.</p>
            )}
          </Podcasts>
        </Container>
        <Container>
          <Topic>
            Horror
            <Link to={`/showpodcasts/horror`} style={{ textDecoration: "none" }}>
              <Span>Show All</Span>
            </Link>
          </Topic>
          <Podcasts>
            {horror.length > 0 ? (
              horror.map((item, index) => {
                return <PodcastCard key={index} data={item} id={item?._id} />;
              })
            ) : (
              <p>No episodes found.</p>
            )}
          </Podcasts>
        </Container>


        <Container>
          <Topic>
            Comedy
            <Link to={`/showpodcasts/love`} style={{ textDecoration: "none" }}>
              <Span>Show All</Span>
            </Link>
          </Topic>
          <Podcasts>
            {comedy.length > 0 ? (
              comedy.map((item, index) => {
                return <PodcastCard key={index} data={item} id={item?._id} />;
              })
            ) : (
              <p>No episodes found.</p>
            )}
          </Podcasts>
        </Container>
        <Container>
          <Topic>
            Motivational
            <Link to={`/showpodcasts/love`} style={{ textDecoration: "none" }}>
              <Span>Show All</Span>
            </Link>
          </Topic>
          <Podcasts>
            {motivational.length > 0 ? (
              motivational.map((item, index) => {
                return <PodcastCard key={index} data={item} id={item?._id} />;
              })
            ) : (
              <p>No episodes found.</p>
            )}
          </Podcasts>
        </Container>
        <Container>
          <Topic>
            Crime
            <Link to={`/showpodcasts/crime`} style={{ textDecoration: "none" }}>
              <Span>Show All</Span>
            </Link>
          </Topic>
          <Podcasts>
            {crime.length > 0 ? (
              crime.map((item, index) => {
                return <PodcastCard key={index} data={item} id={item?._id} />;
              })
            ) : (
              <p>No episodes found.</p>
            )}
          </Podcasts>
        </Container>
      </DashboardMain>
    </>
  );
};

export default Dashboard;
