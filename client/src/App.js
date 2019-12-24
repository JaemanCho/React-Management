import React, { Component } from 'react'
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 1080
    },
    progress: {
      margin: theme.spacing(2)
    }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customers: "",
      completed: 0
    }
  }
  
  // 下部コンポーネントでデータが更新されたらstateを更新する
  stateRefresh = () => {
    this.setState({
      customers: "",
      completed: 0
    });

    // プログレスバー用
    this.timer = setInterval(this.progress, 20);
    // 顧客データ取得
    this.callApi()
      .then(res => {
        this.setState({customers: res})
        clearInterval(this.timer);
      })
      .catch(err => console.log(err));
  }
  
  componentDidMount() {
    // プログレスバー用
    this.timer = setInterval(this.progress, 20);
    // 顧客データ取得
    this.callApi()
      .then(res => {
        this.setState({customers: res})
        clearInterval(this.timer);
      })
      .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    console.log('progress');
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return(
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Genger</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Setting</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(c => { return ( <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)}) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
    )
  }
}

export default withStyles(styles)(App)
