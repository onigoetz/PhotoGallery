import React from 'react';
import { Link } from 'react-router'
import { fetchList } from '../api';
import Breadcrumb from './Breadcrumb';
import image from '../image';

export default class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            breadcrumb: null,
            data: []
        };
        this.handleNewData = this.handleNewData.bind(this);
    }

    handleNewData(data) {
        this.setState(data.data);
    }

    componentDidMount() {
        fetchList(this.props.params.splat).then(this.handleNewData);
    }

    componentWillReceiveProps(nextProps) {
        fetchList(nextProps.params.splat).then(this.handleNewData);
    }

    renderDir(item) {
        return <Link className="Gallery__item" to={`${window.baseURL}/list/${item.path}`} key={item.path}>
            <div>
                <img className="Gallery__image" src={window.baseURL +  image('small', item.thumb)} />
                <span className="Gallery__text">
                    {item.name.replace(/_/g, ' ')}<br />
                    <small>{item.count} Galleries</small>
                </span>
            </div>
        </Link>
    }

    renderGallery(item) {
        return <Link className="Gallery__item" to={`${window.baseURL}/gallery/${item.path}`} key={item.path}>
            <img className="Gallery__image" src={window.baseURL + image('small', item.thumb)}/>
            <span className="Gallery__text">{item.name.replace(/_/g, ' ')}</span>
        </Link>;
    }

    render() {
        return <div>
            <Breadcrumb crumbs={this.state.breadcrumb}/>
            <div className="Gallery">{this.state.data.map(
                item => {
                    return item.type == 'dir' ? this.renderDir(item) : this.renderGallery(item);
                })}</div>
        </div>;
    }
}
