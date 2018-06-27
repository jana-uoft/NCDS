import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { login } from '../../actions/auth';

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount = () => {
    if (this.props.token) this.props.history.push('/admin');
  }

  componentDidUpdate = () => {
    if (this.props.token) this.props.history.push('/admin');
  }

  handleTextChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    this.props.login({email, password})
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={this.login}>
          <TextField
            name="email"
            label="Email"
            className={classes.textField}
            type="email"
            autoComplete="email"
            fullWidth
            autoFocus
            onChange={this.handleTextChange}
            value={this.state.email}
            required
          />
          <TextField
            name="password"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="password"
            fullWidth
            onChange={this.handleTextChange}
            value={this.state.password}
            required
          />
          {this.props.loginError ? <p>{this.props.loginError}</p> : null}
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Login
          </Button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  loginError: state.auth.loginError,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  login: credentials => dispatch(login(credentials))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login))

