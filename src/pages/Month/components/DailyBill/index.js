import classNames from 'classnames'
import './index.scss'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { billTypeToName } from '@/contants'

const DailyBill = (params) => {
	const { date, billList } = params
	const dayResult = useMemo(() => {
		// 支出 / 收入 / 结余
		const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
		const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
		return {
			pay,
			income,
			total: pay + income
		}
	}, [billList])
	return (
		<div className={classNames('dailyBill')}>
			<div className="header">
				<div className="dateIcon">
					<span className="date">{dayjs(date).format("MM月DD日")}</span>
					<span className={classNames('arrow')}></span>
				</div>
				<div className="oneLineOverview">
					<div className="pay">
						<span className="type">支出</span>
						<span className="money">{dayResult.pay}</span>
					</div>
					<div className="income">
						<span className="type">收入</span>
						<span className="money">{dayResult.income}</span>
					</div>
					<div className="balance">
						<span className="money">{dayResult.total}</span>
						<span className="type">结余</span>
					</div>
				</div>
				<div className="billList">
					{
						billList.map(item => {
							return (
								<div className="bill" key={item.id}>
									<div className="detail">
										<div className="billType">{billTypeToName[item.useFor]}</div>
									</div>
									<div className={classNames('money', item.type)}>
										{item.money.toFixed(2)}
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}
export default DailyBill