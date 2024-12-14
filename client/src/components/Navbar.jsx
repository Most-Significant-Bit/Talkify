import React from "react";
import styled from "styled-components";
import { Menu, PersonRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 40px;
  align-items: center;
  box-sizing: border-box;
  color: ${({ theme }) => theme.text_primary};
  gap: 30px;
  background: ${({ theme }) => theme.bgLight}
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5.7px);
  -webkit-backdrop-filter: blur(5.7px) ;
  @media (max-width: 768px) {
    padding: 16px;
  }

`;
const IcoButton = styled(IconButton)`
  color: ${({ theme }) => theme.text_secondary} !important;
`;

const ButtonDiv = styled.div`
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 80px;
  padding: 10px 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
  }
`;

const Navtext = styled.div`
  font-size: 26px;
  font-weight: 600;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Navbar = ({ menuOpen, setMenuOpen }) => {
  return (
    <NavbarDiv>
      <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
        <Menu style={{ fontSize: "30px", cursor: "pointer" }} />
      </IcoButton>

      <Navtext>Welcome, Sumit</Navtext>
      <ButtonDiv>
        <PersonRounded />
        Login
      </ButtonDiv>
    </NavbarDiv>
  );
};

export default Navbar;
