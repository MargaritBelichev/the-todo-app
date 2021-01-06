import React from 'react';
import './styles.css';
import { removeNotificationAction } from '../../helpers/notifications';
import { useSelector, useDispatch } from 'react-redux';


const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  return <div className='Notifications'>
    <ul className='notifiacions-list'>
      {notifications.map((notification) => {
        return <li key={notification.id}>
          <span>{notification.title}</span>
          <span onClick={() => dispatch(removeNotificationAction(notification.id))}>X</span>
        </li>
      })}
    </ul>
  </div>
}

export default Notifications
