import { NavLink } from "react-router-dom"

function Category(){
    return (
        <div>
            <NavLink to={'/recipes'}>
                <h4>Recipes</h4>
            </NavLink>
            <NavLink to={'/cuisine/italian'}>
                <h4>Italian</h4>
            </NavLink>
            <NavLink to={'/cuisine/american'}>
                <h4>American</h4>
            </NavLink>
        </div>
    )
}
export default Category