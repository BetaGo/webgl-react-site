import React, { Component } from 'react';
import Card from '../share/Card';

const nav = [
  {
    index: '01',
    title: 'Phases Viewer',
    action: 'Explore',
  },
  {
    index: '02',
    title: 'Lunar Phase',
    action: 'Read More',
  },
  {
    index: '03',
    title: 'Apollo Missions',
    action: 'Explore',
  },
  {
    index: '04',
    title: 'Solar Eclipses',
    action: 'Read More',
  },
];

class Nav extends Component {
  render() {
    return (
      <div>
        {nav.map(value =>
          <Card>
            <span>
              {value.index}
            </span>
            <h3>
              {value.title}
            </h3>
            <span>
              {value.action}
            </span>
          </Card>,
        )}
      </div>
    );
  }
}

export default Nav;