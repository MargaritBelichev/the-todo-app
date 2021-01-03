import React from 'react';
import { removeNotificationAction } from '../../helpers/notifications';
import { useSelector, useDispatch } from 'react-redux';


const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  return  <div>
    <ul>
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
