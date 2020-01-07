import React, { Component } from 'react'
import { post, put } from 'axios';
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

class CustomerUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            name: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
    }

    // 送信時
    handleFormSubmit = (e, id) => {
        e.preventDefault();
        this.updateCustomer(id)
            .then((res) => {
                this.props.stateRefresh();
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
    updateCustomer = (id) => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', this.state.file);
        formData.append('name', this.state.name);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return put(url, formData, config);
    }

    // Update User ボタンクリック時
    handleClickOpen = (id) => {
        // 顧客データ取得
        this.callApi(id)
            .then(res => {
                this.setState(res[0]);
            })
            .catch(err => console.log(err));
            
        this.setState({
            open: true
        });
    }

    callApi = async(id) => {
        const response = await fetch('/api/customers/' + id);
        const body = await response.json();
        return body;
    }

    // ダイアログが閉じられた時
    handleClickClose = () => {
        this.setState({
            file: null,
            name: '',
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
                <Button variant="contained" onClick={(e) => this.handleClickOpen(this.props.id)}>
                    Update User
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>Update User</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} vlaue={this.state.fileName} onChange={this.handleFileChange}/><br />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "Select a Image": this.state.fileName}
                            </Button>
                        </label>
                        <br />
                        <TextField label="Name" type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                        <TextField label="Birthday" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
                        <TextField label="Gender" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                        <TextField label="Job" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => this.handleFormSubmit(e, this.props.id)}>Submit</Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClickClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerUpdate)
