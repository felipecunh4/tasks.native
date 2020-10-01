import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import todayImage from '../../assets/imgs/today.jpg';
import commonStyles from '../commonStyles';
import moment from 'moment';
import 'moment/locale/pt-br';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TaskList extends Component {
  state = {
    visibleTasks: [],
    showDoneTasks: true,
    tasks: [
      {
        id: Math.random(),
        desc: 'Comprar Livro',
        estimatedAt: new Date(),
        doneAt: new Date(),
      },
      {
        id: Math.random(),
        desc: 'Ler Livro',
        estimatedAt: new Date(),
      },
    ],
  };

  filterTasks = () => {
    let visibleTasks = null;

    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }

    this.setState({visibleTasks});
  };

  toggleTask = taskId => {
    const tasks = this.state.tasks;

    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    this.setState({tasks}, this.filterTasks);
  };

  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks);
  };

  componentDidMount() {
    this.filterTasks();
  }

  render() {
    const today = moment()
      .locale('pt-br')
      .format('ddd, D [de] MMMM');

    return (
      <View style={styles.container}>
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({item}) => (
              <Task {...item} toggleTask={this.toggleTask} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === ' ios' ? 40 : 10,
  },
});
