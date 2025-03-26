import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PodcastCard from "../components/PodcastCard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
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
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
          </Podcasts>
        </Container>

        <Container>
          <Topic>
            Comedy
            <Link
              to={`/showpodcasts/comedy`}
              style={{ textDecoration: "none" }}
            >
              <Span>Show All</Span>
            </Link>
          </Topic>
          <Podcasts>
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
          </Podcasts>
        </Container>
      </DashboardMain>
    </>
  );
};

export default Dashboard;
