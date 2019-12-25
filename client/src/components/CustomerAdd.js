import React, { Component } from 'react'
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
      display: 'none'
    },
    table: {
      minWidth: 1080
    },
    progress: {
      margin: theme.spacing(2)
    }
});

class CustomerAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    // 送信時
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((res) => {
                console.log(res.data)
                this.props.stateRefresh();
            });
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    // ファイル追加
    handleFileChange = (e) => {
        this.setState({ 
            file: e.target.files[0],
            fileName: e.target.value
        });
    }
    
    // テキストフィールド入力時
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;

        this.setState(nextState);
    }

    // 新規追加送信処理
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    // Add User ボタンクリック時
    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    // ダイアログが閉じられた時
    handleClickClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Add User
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} vlaue={this.state.fileName} onChange={this.handleFileChange}/><br />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "Select a Image": this.state.fileName}
                            </Button>
                        </label>
                        <br />
                        <TextField label="Name" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                        <TextField label="Birthday" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
                        <TextField label="Gender" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                        <TextField label="Job" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>Submit</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClickClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd)
