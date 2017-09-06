import React from 'react';
import injectSheet from 'react-jss';
import Card from '../../../components/share/Card';

import staggeredMotion from '../../../components/HOC/staggeredMotion';

const nav = [
  {
    index: '01',
    title: 'Dancing With Code',
    action: 'Explore'
  },
  {
    index: '02',
    title: 'Fly With Book',
    action: 'Read More'
  },
  {
    index: '03',
    title: 'Walk With Mind',
    action: 'Explore'
  },
  {
    index: '04',
    title: 'Sleep With Music',
    action: 'Read More'
  }
];

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
    minWidth: '800px',
    color: theme.text.hint
  },
  title: {
    color: theme.text.secondary
  },
  card: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    minWidth: '200px'
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    transition: '0.3s',
    textAlign: 'left',
    willChange: 'transform',
    '&:hover': {
      transform: 'translateX(1em)'
    }
  },
  cardText: {
    transform: 'translateY(-100%)'
  }
});

const cardsArray = nav.map((value, index) => {
  function Nav(props) {
    const { classes, ...others } = props;
    return (
      <Card className={classes.card} {...others}>
        <div className={classes.cardContent}>
          <div className={classes.cardText}>
            <span>
              {value.index}
            </span>
            <h3 className={classes.title}>
              {value.title}
            </h3>
            <span>
              {value.action}
            </span>
          </div>
        </div>
      </Card>
    );
  }
  return injectSheet(styles)(Nav);
});

// function Nav(props) {
//   const { classes, ...others } = props;
//   return (
//     <div className={classes.root} {...others}>
//       {nav.map(value =>
//         <Card className={classes.card}>
//           <div className={classes.cardContent}>
//             <div className={classes.cardText}>
//               <span>
//                 {value.index}
//               </span>
//               <h3 className={classes.title}>
//                 {value.title}
//               </h3>
//               <span>
//                 {value.action}
//               </span>
//             </div>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// }

const AnimatedNav = staggeredMotion({
  stiffness: 180,
  damping: 16
})(cardsArray);

const App = props => <AnimatedNav className={props.classes.root} />;

export default injectSheet(styles)(App);
