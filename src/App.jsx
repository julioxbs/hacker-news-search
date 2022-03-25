import { Component } from "react";
import Search from './Components/Search';
import Loading from "./Components/Loading";
import './App.css';

export default class MyApp extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            result: null,
            searchTerm: 'redux',
            page: 0,
            isLoading: false,
        }

        this.handleInput = this.handleInput.bind(this);
        this.setSearch = this.setSearch.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        const { searchTerm, page } = this.state
        this.getDataApi(searchTerm, page);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getDataApi(searchTerm, page) {
        try {
            let response = await fetch(`http://hn.algolia.com/api/v1/search?query=${searchTerm}&tags=story&page=${page}`);
            let data = await response.json();
            this._isMounted && this.setState({ result: data, isLoading: (data ? true : false) });
        } catch (error) {
            console.log(error);
        }
    }

    setSearch(e) {
        this.setState({ searchTerm: e.target.value });
    }

    handleInput(e) {
        const { searchTerm, page } = this.state;
        e.preventDefault();
        this.getDataApi(searchTerm, page);
    }

    nextPage() {
        const { searchTerm, page } = this.state;
        this.setState({ page: page + 1 });
        this.getDataApi(searchTerm, page);
    }

    prevPage() {
        const { searchTerm, page } = this.state;
        this.setState({ page: page - (page > 0 ? 1 : 0) });
        this.getDataApi(searchTerm, page);
    }

    render() {
        const { result, isLoading } = this.state;
        return (
            <div className="container">
                <Search
                    onSubmit={this.handleInput}
                    onChange={this.setSearch}>
                    Pesquisar...
                </Search>

                <ul>
                    {result ? result.hits.map((items, i) =>
                        <li key={i}>{items.title}</li>
                    ) : null}
                </ul>

                <div className="buttons">
                    {isLoading
                        ? <>
                            <button onClick={this.prevPage}>
                                Voltar
                            </button>

                            <button onClick={this.nextPage}>
                                Proximo
                            </button>
                        </> : <Loading />

                    }
                </div>
            </div>
        );
    }
}

