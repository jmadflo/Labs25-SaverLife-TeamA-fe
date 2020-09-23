import React, { useEffect } from 'react';
import { Tooltip, Switch } from 'antd';
import { QuestionCircleOutlined, BulbTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { getDashboard } from '../../../actionCreators/mainActions.js';
import { Navbar, GoalProgressBar } from '../../common/index';
import TransactionsTable from './TransactionsTable';

import '../../../styles/App.scss';

function RenderHomePage(props) {
  const { authService } = props;

  const dispatch = useDispatch();
  const transactions = useSelector(state => state.dashboard.transactions);
  const futureBudget = useSelector(state => state.futureBudget);
  const currentMonthlySpending = useSelector(
    state => state.currentMonthlySpending
  );

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  const [darkMode, setDarkMode] = React.useState(getMode);

  useEffect(() => {
    localStorage.setItem('dark', JSON.stringify(darkMode));
  }, [darkMode]);

  function getMode() {
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    return savedMode || false;
  }

  return (
    <div
      className={
        darkMode ? 'pageContainer dark-mode' : 'pageContainer light-mode'
      }
    >
      <div className="navContainer">
        <Navbar home={true} authService={authService} />
      </div>

      <div className="headerText">
        <h2 className="pageHeader">My Dashboard</h2>

        <Tooltip
          className="tooltipHeader"
          placement="bottom"
          title="What do you want others to call you?"
        >
          <QuestionCircleOutlined />
        </Tooltip>

        <div className="lightSwitchContainer">
          <Switch
            className="lightSwitch"
            checked={darkMode}
            onChange={() => setDarkMode(prevMode => !prevMode)}
            size="small"
          />
          <BulbTwoTone
            twoToneColor={darkMode ? '#ecb7db' : '#808080'}
            className="bulbIcon"
          />
        </div>
      </div>

      <div className="contentContainer">
        <div className="borderBox">
          <TransactionsTable transactions={transactions} />
        </div>
      </div>

      <div className="progressBarContainer">
        {/* TODO: Change Progress Bar to #00a6af when percent is at 100 */}
        <GoalProgressBar
          categoryGoals={futureBudget}
          categoryCurrent={currentMonthlySpending}
        />
      </div>
    </div>
  );
}
export default RenderHomePage;
