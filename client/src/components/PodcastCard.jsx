import React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import FavouriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useAuthStore } from "../store/authStore";
import { FcLike } from "react-icons/fc";

const PlayIcon = styled.div`
  padding: 10px;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: green !important;
  color: white !important;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: absolute !important;
  top: 45%;
  right: 10%;
  display: none;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 16px 4px #9000ff50 !important;
`;

const Card = styled(Link)`
  position: relative;
  text-decoration: none;
  background-color: #111827;
  border: 1px solid black;
  max-width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
  &:hover ${PlayIcon} {
    display: flex;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`;
const MainInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: white;
  justify-content: flex-start;
  gap: 4px;
`;
const Title = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #1fd655;
`;

const Desc = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
`;

const CardImage = styled.img`
  object-fit: cover;
  width: 220px;
  height: 140px;
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
`;
const CardInfo = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 450;
  padding: 14px 0px 0px 0px;
  width: 100%;
`;

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
`;
const Name = styled.div`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;

const Favourite = styled(IconButton)`
  color: white;
  top: 8px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.text_secondary + 95} !important;
  color: white !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 16px 6px #222423 !important;
`;

const Views = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.text_secondary};
  width: max-content;
`;

function getFirstLetter(name) {
  if (typeof name !== 'string' || name.length === 0) {
    return ''; // Return an empty string if the input is not a valid string
  }
  return name.charAt(0);
}


const PodcastCard = ({data}) => {
  
  const {user : currentUser} = useAuthStore();

  return (
      <Card to={`/podcast/${data?._id}`}>
        <Top>
          <Favourite>
            { (data?.favorite_by?.includes(currentUser?._id)) ? <FcLike/>  : <FavouriteIcon /> }
          </Favourite>

          <CardImage src={data?.thumbnail} />
        </Top>

        <CardInfo>
          <MainInfo>
            <Title>{data?.title}</Title>
            <Desc>
              {data?.description}
            </Desc>
            <CreatorInfo>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Avatar
                  style={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "green",
                  }}
                >
                  { getFirstLetter(data?.createdBy.name)}
                </Avatar>
                <Name>{data?.createdBy.name}</Name>
              </div>
              <Views>• {data?.favorites} Likes</Views>
            </CreatorInfo>
          </MainInfo>
        </CardInfo>

        <PlayIcon>
          {true ? (
            <PlayArrowIcon style={{ width: "28px", height: "28px" }} />
          ) : (
            <HeadphonesIcon style={{ width: "28px", height: "28px" }} />
          )}
        </PlayIcon>
      </Card>
  );
};

export default PodcastCard;
