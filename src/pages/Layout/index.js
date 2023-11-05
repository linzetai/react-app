import { Outlet } from "react-router"

const Layout = () => {
    return (
        <div>
            <Outlet></Outlet>
            <span>我是Layout</span>
        </div>
    )
}

export default Layout