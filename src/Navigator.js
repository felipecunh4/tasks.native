import React from 'react';
import Auth from './views/Auth';
import TaskList from './views/TaskList';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Menu from './views/Menu';
import commonStyles from './commonStyles';

const menuConfig = {
  initialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions: {
    labelStyle: {
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20,
    },
    activeLabelStyle: {
      color: '#080',
      fontWeight: 'bold',
    },
  },
};

const menuRoutes = {
  Today: {
    name: 'Today',
    screen: props => <TaskList title="Hoje" daysAhead={0} {...props} />,
    navigationOptions: {
      title: 'Hoje',
    },
  },
  Tomorrow: {
    name: 'Tomorrow',
    screen: props => <TaskList title="Amanha" daysAhead={1} {...props} />,
    navigationOptions: {
      title: 'Amanha',
    },
  },
  Week: {
    name: 'Week',
    screen: props => <TaskList title="Semana" daysAhead={7} {...props} />,
    navigationOptions: {
      title: 'Semana',
    },
  },
  Month: {
    name: 'Month',
    screen: props => <TaskList title="Mes" daysAhead={30} {...props} />,
    navigationOptions: {
      title: 'Mes',
    },
  },
};

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig);

const mainRoutes = {
  Auth: {name: 'Auth', screen: Auth},
  Home: {
    name: 'Home',
    screen: menuNavigator,
  },
};

const mainNavigator = createSwitchNavigator(mainRoutes, {
  initialRouteName: 'Auth',
});

export default createAppContainer(mainNavigator);
