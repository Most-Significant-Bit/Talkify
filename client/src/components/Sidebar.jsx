import React from "react";
import styled from "styled-components";
import {
  HomeRounded,
  CloseRounded,
  SearchRounded,
  FavoriteRounded,
  LightModeRounded,
  LogoutRounded,
  DarkModeRounded,
  CloudUploadRounded,
} from "@mui/icons-material";
import LogoImage from "../images/Logo.png";
import  {Link} from "react-router-dom"


const MenuContainer = styled.div`
  flex: 0.5;
  flex-direction: column;
  height: 100vh;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 1100px) {
    position: fixed;
    z-index: 1000;
    width: 100%;
    max-width: 250px;
    left: ${({ menuOpen }) => ( menuOpen ? "0" : "-100%")};
    transition: 0.3s ease-in-out;
  }
`;

const Elements = styled.div`
padding: 4px 16px;
display: flex;
flex-direction: row;
box-sizing: border-box;
justify-content: flex-start;
align-items: center;
gap: 12px;
cursor: pointer;
color:  ${({ theme }) => theme.text_secondary};
width: 100%;
&:hover{
    background-color: ${({ theme }) => theme.text_secondary + 50};
}
`;

const NavText = styled.div`
  padding: 12px 0px;
  font-size: 15px;
`;
const HR = styled.div`
  width: 100%;
  height: 2px;
  background-color: grey;
  margin: 20px 0px;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 16px;
  margin-bottom: 10px;
`;
const Close = styled.div`
  margin-left: 100px;
  @media (max-width: 1100px) {
    display: block;
    margin-left: 18px;
  }
`;
const Logo = styled.div`
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  font-size: 2.7rem;
  font-family: cursive;
  margin: 16px 0px;
`;
const Image = styled.img`
  height: 40px;
`;


const Sidebar = ({menuOpen, setMenuOpen, setDarkMode, darkMode}) => {

  const menuItems = [
    {
      link: "/",
      name: "Dashboard",
      icon: <HomeRounded />,
    },
    {
      link: "/search",
      name: "Search",
      icon: <SearchRounded />,
    },
    {
      link: "/favourites",
      name: "Favourites",
      icon: <FavoriteRounded />,
    },
  ];
  
  const buttons = [
    {
      func: () => console.log("Upload"),
      name: "Upload",
      icon: <CloudUploadRounded />,
    },
    {
      func: () => setDarkMode(!darkMode),
      name: darkMode ? "Light Mode" : "Dark Mode",
      icon: darkMode ? <LightModeRounded /> : <DarkModeRounded/>,
    },
    {
      func: () => console.log("Log Out"),
      name: "Log Out",
      icon: <LogoutRounded />,
    },
  ];

  return (
    <MenuContainer menuOpen={menuOpen}>
      <Flex>
        <Logo>
          <Image src={LogoImage} />
          Talkify
        </Logo>
        <Close style={{cursor: "pointer" , marginTop: "5px"}} onClick={()=> setMenuOpen(!menuOpen)}>
          <CloseRounded/>
        </Close>
      </Flex>

      {menuItems.map((item ) => (
        <Link to={item.link} style={{textDecoration: "none", width: "100%"}}>
          <Elements>
            {item.icon}
            <NavText>{item.name}</NavText>
          </Elements>
        </Link>
      ))}

      <HR />

      {buttons.map((item) => (
        <Elements onClick={item.func}>
          {item.icon}
          <NavText>{item.name}</NavText>
        </Elements>
      ))}
    </MenuContainer>
  );
};

export default Sidebar;
