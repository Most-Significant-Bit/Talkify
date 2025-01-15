import React from 'react'
import styled from 'styled-components';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Category } from "../utils/Data";
import { Link } from '@mui/material';
import {DefaultCard} from "../components/DefaultCard.jsx";
import TopResult from "../components/TopResult.jsx";
import MoreResult from '../components/MoreResult.jsx';
import {CircularProgress} from "@mui/material";

const SearchMain = styled.div`
padding:20px 30px;
padding-bottom: 200px;
height: 100%;
overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 9px;
  }
`;

const SearchedCards = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    padding: 14px;
    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        padding: 6px;
    }
`;


const SearchBar = styled.div`
max-width: 700px;
display: flex;
width: 100%;
border:1px solid ${({ theme }) => theme.text_secondary};
border-radius: 30px;
cursor: pointer;
padding:12px 16px;
justify-content: flex-start;
align-items: center;
gap: 6px;
color: ${({ theme }) => theme.text_secondary};
`;

const Categories = styled.div`
margin: 20px 10px;`;

const Heading = styled.div`
align-items: flex-start;
color:${({ theme }) => theme.text_primary};
font-size: 22px;
font-weight: 540;
margin: 10px 14px;
`;

const BrowseAll = styled.div`
display: flex;
flex-wrap: wrap;
gap:20px;
padding:14px;
`;


const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
width: 100%;
`

const OtherResults = styled.div`
    display: flex;
    flex-direction: column;
    height: 700px;
    overflow-y: scroll;
    overflow-x: hidden;
    gap: 6px;
    padding: 4px 4px;
    @media (max-width: 768px) {
        height: 100%;
        padding: 4px 0px;
    }
`;


const Search = () => {
  const [searched, setSearched] = React.useState("");
  const [searchedPodcasts, setSearchedPodcasts] = React.useState([1,2,3,4,5,6]);
  const [loading, setLoading] = React.useState(false);

  const handleChange=async (e)=>{
    setSearched(e.target.value);
    setLoading(true);
  }
  return (
    <SearchMain>
      <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
      <SearchBar>
        <SearchOutlinedIcon sx={{color:"inherit"}}/>
        <input type='text' placeholder='Search Artist/Podcasts' style={{border:'none', outline: "none", width: "100%" , background: "inherit", color: "inherit"}}
        value={searched} onChange={(e) => handleChange(e)}/>
      </SearchBar>
      </div>
      {searched === "" ? (
        <Categories>
          <Heading>Browse All</Heading>
          <BrowseAll>
          {Category.map((category)=>(
            <Link
            to={`/showpodcasts/${category.name.toLowerCase()}`}
            style={{textDecoration: "none"}}
            >
              < DefaultCard category={category} />
            </Link>
          ))}
          </BrowseAll>
          </Categories>
        ) : (
          <>
          {
            loading ? (<Loader><CircularProgress/></Loader>):(<SearchedCards>{searchedPodcasts.length===0?(<>No Podcasts Found</>):(<>
            <TopResult podcast={searchedPodcasts[0]} />
              <OtherResults>
                  {searchedPodcasts.map((podcast) => (
                      <MoreResult podcast={podcast} />
                  ))}
              </OtherResults></>)}</SearchedCards>)
          }
          </>
          )}
    </SearchMain>
  )
}

export default Search;