import React from 'react';
import debounce from 'lodash/debounce';
import styles from './Loading.scss';
const INITIAL_STEP = 10;
const STUCK_THRESHOLD = 99;
export class Loading extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            progress: 0,
            step: INITIAL_STEP,
            animation: null,
        };
        this.ariaValuenow = debounce(() => {
            const { progress } = this.state;
            return Math.floor(progress / 10) * 10;
        }, 15);
    }
    componentDidMount() {
        this.increment();
    }
    componentWillUnmount() {
        const { animation } = this.state;
        if (animation != null) {
            cancelAnimationFrame(animation);
        }
    }
    render() {
        const { progress } = this.state;
        const customStyles = {
            transform: `scaleX(${Math.floor(progress) / 100})`,
        };
        const ariaValuenow = this.ariaValuenow();
        return (<div className={styles.Loading}>
        <div className={styles.Level} style={customStyles} aria-valuenow={ariaValuenow} aria-valuemin={0} aria-valuemax={100} role="progressbar"/>
      </div>);
    }
    increment() {
        const { progress, step } = this.state;
        if (progress >= STUCK_THRESHOLD) {
            return;
        }
        const animation = requestAnimationFrame(() => this.increment());
        this.setState({
            progress: Math.min(progress + step, 100),
            step: INITIAL_STEP ** -(progress / 25),
            animation,
        });
    }
}