import React from 'react';
import {Link} from 'react-router-dom';

class Error extends React.Component
{
  render() {
    return (
      <section className="column is-offset-6 is-6">
        <p>Error Page</p>
        <p> {this.props.error}</p>
        { this.props.name === "Register" ?
          <div>Click <Link to='/register'>here </Link>to Register. </div>
          :
          <div> Click <Link to='/'>here </Link>to Login. </div>
        }
      </section>
    )
  }
};

export default Error