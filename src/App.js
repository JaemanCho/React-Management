import React, { Component } from 'react'
import Customer from './components/Customer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 1080
    }
});

const customers = [
  {
    id: 1,
    image: 'https://placeimg.com/64/64/1',
    name: 'Kim1',
    birthday: '971222',
    gender: 'Man',
    job: 'Programmer'
  },
  {
    id: 2,
    image: 'https://placeimg.com/64/64/2',
    name: 'Kim2',
    birthday: '971222',
    gender: 'Man',
    job: 'Programmer'
  },
  {
    id: 3,
    image: 'https://placeimg.com/64/64/3',
    name: 'Kim3',
    birthday: '971222',
    gender: 'Man',
    job: 'Programmer'
  },
  {
    id: 4,
    image: 'https://placeimg.com/64/64/4',
    name: 'Kim4',
    birthday: '971222',
    gender: 'Man',
    job: 'Programmer'
  },
  {
    id: 5,
    image: 'https://placeimg.com/64/64/5',
    name: 'Kim5',
    birthday: '971222',
    gender: 'Man',
    job: 'Programmer'
  }
]

class App extends Component {
 
  render() {
    console.log(this.props);
    const { classes } = this.props;
    console.log(classes);
    return(
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
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />)})}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(App)
