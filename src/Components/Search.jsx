import { Component } from "react";

export default class Search extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.input) {
            this.input.focus();
        }
    }

    render() {
        const {onSubmit, onChange, children} = this.props
        return(
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder={children}
                    ref={(node) => {this.input = node}}
                />
                <button type="submit">Pesquisar</button>
            </form>
        );
    }
}