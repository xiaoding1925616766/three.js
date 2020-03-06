import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css'
class Index extends Component {
    props: ['list']
    render() {
        return (
            <div className={'list'}>
                <ul>
                    {
                        this.props.list.map(item =>{
                            return(
                                <li key={item.name}>
                                    <Link to={item.path}>{item.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Index;