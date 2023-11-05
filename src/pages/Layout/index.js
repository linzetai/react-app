import { getBillList } from "@/store/modules/billStore"
import { Button } from "antd-mobile"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router"

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    return (
        <div>
            <Outlet></Outlet>
            <span>我是Layout</span>
            <Button color="primary">测试全局</Button>
            <div className="puple">
                <Button color="primary">测试局部</Button>
            </div>
        </div>
    )
}

export default Layout