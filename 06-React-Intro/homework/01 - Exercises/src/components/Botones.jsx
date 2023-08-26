import React from "react";

class Botones extends React.Component {
    constructor(props) {
        super(props)
    }
    /*handleClick(prop) {
        const text = this.alerts[prop];
        alert(text);
    }*/
    render() {
        console.log(this.props);
        return (
            <div>
                <button onClick={() => alert(this.props.alerts.m1)}>Módulo 1</button>
                <button onClick={() => alert(this.props.alerts.m2)}>Módulo 2</button>
            </div>
        )
    }
}

export default Botones;