import { Component } from 'react';
import './Weavy.css';
import WeavyContext from './WeavyContext';

export default class WeavyChat extends Component {
    static contextType = WeavyContext;
    async createWeavyChat() {
        this.weavySpace = this.weavy.space({
            key: this.props.spaceKey,
            name: this.props.spaceName
        });
        this.weavyChat = this.weavySpace.app({
            key: this.props.appKey,
            type: this.props.appType,
            name: this.props.appName,
            container: this.el
        });
    }

    componentDidMount() {
        this.weavy = this.context.weavy;
        this.createWeavyChat();
    }

    shouldComponentUpdate(nextProps){
        // A key must change for the app to change
        var spaceChanged = nextProps.spaceKey !== this.props.spaceKey;
        var appChanged = nextProps.appKey !== this.props.appKey;
        return spaceChanged || appChanged;
    }

    componentDidUpdate(prevProps) {
        this.weavyChat.remove();
        this.createWeavyChat();
    }

    componentWillUnmount() {
        this.weavyChat.remove();
    };

    render() {
        return <div className="weavy-container" ref={el => this.el = el} />;
    };
}