import React from 'react';
import Auth from './views/Auth';
import TaskList from './views/TaskList';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

const mainRoutes = {
  Auth: {name: 'Auth', screen: Auth},
  Home: {
    name: 'Home',
    screen: TaskList,
  },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Auth',
});

export default createAppContainer(mainNavigator);
