import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from 'react-redux'

const New = () => {
    const navigate = useNavigate()

    const [billType, setBillType] = useState('pay') // pay-支出 income-收入
    const [isDateVisible, setDateVisible] = useState(false)
    const [currentDate, setCurrentDate] = useState(new Date())
    const [money, setMoney] = useState(0.00)
    const [useFor, setUseFor] = useState('')

    const handleDateConfirm = (date) => {
        setCurrentDate(date)
    }
    const getDateString = (date) => {
        if (dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD"))
            return '今天'
        
        return dayjs(date).format('YYYY-MM-DD')
    }

    const moneyChange = (value) => {
        setMoney(value)
    }

    const dispatch = useDispatch()
    const saveBill = () => {
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: currentDate,
            useFor
        }
        dispatch(addBillList(data))
        navigate(-1)
    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' && 'selected')}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames(billType === 'income' && 'selected')}
                        shape="rounded"
                        onClick={() => setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date" onClick={() => setDateVisible(true)}>
                            <Icon type="calendar" className="icon" />
                            <span className="text">{getDateString(currentDate)}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                visible={isDateVisible}
                                max={new Date()}
                                onCancel={() => setDateVisible(false)}
                                onConfirm={handleDateConfirm}
                                onClose={() => setDateVisible(false)}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                ''
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New