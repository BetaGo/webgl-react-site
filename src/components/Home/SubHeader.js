import React, { Component } from 'react';
import injectSheet from 'react-jss';
import SearchIcon from 'react-icons/lib/fa/search';
import MenuIcon from 'react-icons/lib/md/menu';
import WeiboIcon from 'react-icons/lib/fa/weibo';
import GitHubIcon from 'react-icons/lib/fa/github';
import TwitterIcon from 'react-icons/lib/fa/twitter';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '15%',
    padding: '50px',
    fontSize: '36px',
    textAlign: 'right',
    color: theme.text.hint
  },
  icon: {
    margin: '20px'
  },
  iconRow: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
  iconColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 'auto'
  },
  '@media (min-width: 1366px)': {
    root: {
      padding: '30px',
      fontSize: '25px'
    }
  }
});

class SubHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.iconRow}>
          <MenuIcon />
          <SearchIcon />
        </div>
        <div className={classes.iconColumn}>
          <a className={classes.link} href="http://weibo.com/TrueIronMan">
            <WeiboIcon className={classes.icon} />
          </a>
          <a className={classes.link} href="https://twitter.com/IronManGWT">
            <TwitterIcon className={classes.icon} />
          </a>
          <a className={classes.link} href="https://github.com/GoWantong">
            <GitHubIcon className={classes.icon} />
          </a>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(SubHeader);
