import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let items = this.props.items.map((item, index) => {
            return (
                <li key={index} className="list-item">
                   <div className={`list-block ${item.class}`}>
                        <div className="list-block-title">
                            {item.name}
                        </div>
                        <div className="list-block-data">
                            {item.data}
                        </div>
                    </div>
                </li>
            );
        });
        return (
            <div className="list-container">
                <div className="list-title">
                    {this.props.title}
                </div>
                <ul style={{'maxHeight': this.props.height ? this.props.height : 'auto'}}>
                    {this.props.items.length !== 0 && items}
                    {this.props.items.length === 0 &&
                        <div>Loading</div>
                    }
                </ul>
            </div>
        );
    }
}

export default List;
