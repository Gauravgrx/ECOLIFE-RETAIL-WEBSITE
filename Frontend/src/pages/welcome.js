import React from 'react';
import {Link} from 'react-router-dom';

class Welcome extends React.Component
{
  render() {
    return (
      <section className="column is-offset-6 is-6">
        <p>Welcome <b> {this.props.name} </b> </p>
        <div>
          Click <Link to="/login">here</Link> to logout.
        </div>
      </section>
    )
  }
};

export default Welcome