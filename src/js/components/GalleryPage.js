import React from 'react';
import Gallery from 'react-photo-gallery';
import { Link } from 'react-router'
import { fetchGallery } from '../api';
import Breadcrumb from './Breadcrumb';
import image from '../image';

export default class GalleryPage extends React.Component {

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
        fetchGallery(this.props.params.splat).then(this.handleNewData);
    }

    componentWillReceiveProps(nextProps) {
        fetchGallery(nextProps.params.splat).then(this.handleNewData);
    }

    render() {
        return <div>
            <Breadcrumb crumbs={this.state.breadcrumb}/>
            <Gallery photos={this.state.data} />
        </div>;
    }
}
