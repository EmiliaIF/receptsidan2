import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const StyledNav = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin: auto;
    background-color: #F06363;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    p {
        font-size: 24px;
    };
    a {
        text-decoration: none;
        color: black;
    };

    .link-active {
        font-weight: bold;
    }
`

const Navbar = () => {
    const [categories, setCategories] = useState<any>([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            const category = await fetch('http://localhost:3005/kategori/')
        
            .then(res => res.json())
            setCategories(category);
            console.log( categories);
        }
        fetchRecipes();
    }, [])
    return (
        <StyledNav>
            {categories.map((category: any) => <NavLink className={({ isActive }) => (isActive ? "link-active" : "link")} to={`/kategori/${category._id}`} key={category._id}> <p>{category._id} ({category.count})</p></NavLink>)}
        </StyledNav>
    )
}
export default Navbar;