import { Link } from 'react-router';

export default (props) => {
    var first = true;
    var final = [];
    for (var i in props.crumbs) {
        if (!props.crumbs.hasOwnProperty(i)) {
            continue;
        }

        if (!first) {
            final.push(" > ");
        }

        if (first) {
           first = false;
        }

        var crumb = props.crumbs[i];
        if (crumb.url) {
            final.push(<Link to={crumb.url} className="Breadcrumb__link" key={crumb.url}>{crumb.title.replace(/_/g, ' ')}</Link>);
        } else {
            final.push(<span className="Breadcrumb__current" key="current_item">{crumb.title.replace(/_/g, ' ')}</span>);
        }
    }

    return <div className="Breadcrumb">{final}</div>;
}
