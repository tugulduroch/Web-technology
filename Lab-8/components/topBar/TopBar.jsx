import React from 'react';
import {
  AppBar, Checkbox, FormControlLabel, Toolbar, Typography, Button,
} from '@material-ui/core';
import axios from "axios";
import './TopBar.css';
import {Link} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';

/**
 * Define TopBar, a React component of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleUploadButtonClicked = (e) => {
    e.preventDefault();
    if (this.uploadInput.files.length > 0) {
      // Create a DOM form and add the file to it under the name uploadedphoto
      const domForm = new FormData();
      domForm.append('uploadedphoto', this.uploadInput.files[0]);
      axios.post('/photos/new', domForm)
        .then((res) => {
          console.log(res.data);
          alert('post new photo successfully');
          this.props.handleUpload();
        })
        .catch(err => {
          alert(`POST ERR: ${err.response.data}`);
          console.log(`POST ERR: ${err.response.data}`);
        });
    } else {
      alert('No file chosen');
    }
  };

  render() {
    return (
      <div className="cs142-topbar-root">
        <AppBar className="cs142-topbar-appBar" position="absolute">
          <Toolbar>
            {
              this.props.userIsLoggedIn ?
                <div id="cs142-topbar-container">
                  <Typography variant="h6" color="inherit" className="cs142-topbar-welcome">
                    Hey - {this.props.user ? this.props.user.first_name : null}
                  </Typography>
                  <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/favorites"
                          className='cs142-topbar-fav'
                          endIcon={<FavoriteIcon/>}
                  >
                    Таалагдсан
                  </Button>
                  <div className='cs142-upload'>
                  <form className="cs142-topbar-form" noValidate onSubmit={this.handleUploadButtonClicked}>
                    <input
                      type="file"
                      accept="image/*"
                      className="cs142-topbar-input"
                      ref={(domFileRef) => { this.uploadInput = domFileRef; }}
                    />
                    
                    
                    <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span"
                    className="cs142-topbar-upload"
                    type="submit"
                    >
                   Зураг + 
                    </Button>
                    </label>
                  </form>
                  </div>
                  {/* <Typography variant="h6" color="inherit" className="cs142-topbar-version">
                    {this.props.version}
                  </Typography> */}
                  <FormControlLabel className="cs142-topbar-checkbox"
                    control={
                      <Checkbox checked={this.props.checked} onChange={this.props.handleChange} />
                    }
                    label={
                      <Typography variant="h7" color="inherit" className="cs142-topbar-checkbox-label">
                        Дэлгэрэнгүй
                      </Typography>
                    }
                  />
                  <Button className="cs142-topbar-logout" 
                  color="inherit" 
                  onClick={this.props.handleLogout}
                  endIcon={<ExitToAppIcon/>}>
                    Гарах
                  </Button>
                </div> :
                <Typography variant="h5" color="inherit">
                  Хэрэглэгчийн хэсэг
                </Typography>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default TopBar;
