import { NavBar, DatePicker } from 'antd-mobile'
import { useState } from 'react'
import classNames from 'classnames'
import './index.scss'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { useMemo } from 'react'

const Month = () => {
    // 按月做数据分组
    const billList = useSelector(state => state.bill.billList)
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    
    const [dateVisible, setDateVisible] = useState(false)
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY-MM')
    })
    const [currentMonthList, setMonthList] = useState([])

    const monthResult = useMemo(() => {
        console.log(currentMonthList)
        // 支出 / 收入 / 结余
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList])

    // 确认回调
    const handleDateConfirm = (date) => {
        setDateVisible(false)
        const formatDate = dayjs(date).format('YYYY-MM')
        setMonthList(monthGroup[formatDate])
        setCurrentDate(formatDate)
    }
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date">
                        <span className="text">
                            {currentDate} 月账单
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')} onClick={() => setDateVisible(true)}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={handleDateConfirm}
                        onClose={() => setDateVisible(false)}
                    />
                </div>
            </div>
        </div >
    )
}

export default Month