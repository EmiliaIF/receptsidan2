import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledNav = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    margin: auto;
    p {
        font-size: 24px;
    };
    a {
        text-decoration: none;
        color: black;
    };
`

const Navbar = () => {
    const [categories, setCategories] = useState<any>([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            const category = await fetch('http://localhost:3005/kategori')
        
            .then(res => res.json())
            setCategories(category);
            console.log( category);
        }
        fetchRecipes();
    }, [])
    return (
        <StyledNav>
            
            {categories.map((category: any) => <Link to={`/kategori/${category._id}`} key={category}> <p>{category._id} ({category.count})</p></Link>)}
        </StyledNav>
    )
}
export default Navbar;