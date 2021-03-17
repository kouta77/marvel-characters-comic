import React from 'react';
import { getCharacters } from '../../services/apiProvider';
import { CharactersList, DropDown } from '../../components';
import { trimString } from '../../helpers/helpers';
import { compareFunction } from '../../helpers/helpers';
import './styles.css';


const OrderByValues = [
    {id:0, name: 'name - asc', value:'name - asc'},
    {id:1, name: 'name - desc', value:'name - desc'},
    {id:2, name: 'comics', value:'comics'},
    {id:3, name: 'stories', value:'stories'},
];

let filterComic = [{id: -100 ,name: "All", value: "All"}];
class Characters extends React.Component {
    constructor(props){
        super(props);

        this.setFilterWord = this.setFilterWord.bind(this);
        this.setOrderBy = this.setOrderBy.bind(this);
        this.setFilterComic = this.setFilterComic.bind(this);
        this.HandleCheckboxState = this.HandleCheckboxState.bind(this);
        this.changeFilter = this.HandleFilterChange.bind(this);
        this.state = {
            characters: [],
            filterby: "",
            chars: [],
            filterWord: '',
            currentfilterComic: '',
            onlyBooked: false,
            loading: true,
            filteredCharacters:[],
        };
    }

    setFilterWord = word => {
        this.setState({filterWord: word.target.value}, ()=> this.HandleFilterChange());
    }

    setOrderBy = filter => {
        this.setState({filterby: filter}, ()=> this.HandleFilterChange());
    }

    setFilterComic = comic => {
         console.log('orderComic',comic);
        this.setState({currentfilterComic: comic}, ()=> this.HandleFilterChange());
    }
    
    componentDidMount(){
        getCharacters().then(characters => {

        characters?.forEach(char => {
            char.comics.items.forEach(comic => {
                if(!(comic in filterComic))
                    filterComic.push({
                        id: char.id + comic.resourceURI,
                        name: comic.name,
                        value: comic.name
                    });
                });
        });

            console.log(characters);
            this.setState(
                {characters: characters, filteredCharacters: characters , filterby: 'name - asc', filterWord: '' },
                ()=> this.setState({loading: false}));
        });
    }

    HandleCheckboxState(event){
        const target = event.target;
        const checked = target.checked;

        console.log(this.onlyBooked, checked);

        this.setState({
            onlyBooked: checked
        }, ()=> this.HandleFilterChange());

        
    }

    HandleFilterChange(){
        const {
            characters,
            filterby, 
            filterWord,
            currentfilterComic,
            onlyBooked,
        } = this.state;
        
        let tempCharacters = [...characters];
        
        // FIRST FILTER -- CHECK FOR CHARs IN COMICS
        if(currentfilterComic !== '' && currentfilterComic !== "All") {
            let byComic = tempCharacters.filter( char => {
                let isthere = char.comics.items.some( obj => obj.name === currentfilterComic );
                console.log('somethere', isthere);
                return isthere;
                }
            );
            tempCharacters = [...byComic];
        }
        else
        tempCharacters = [...characters];

        // SECOND FILTER -- CHECK SORTING FILTER
        switch (filterby) {
            case 'name - asc':
                tempCharacters.sort((a,b) => 
                    compareFunction(a.name,b.name, true));
                break;
            case 'name - desc':
                tempCharacters.sort((a,b) => 
                    compareFunction(a.name,b.name, false));
                break;
            case 'comics':
                tempCharacters.sort( (a, b) => 
                    compareFunction(a.comics.available,b.comics.available, true));
                break;
            case 'stories':
                tempCharacters.sort( (a, b) => 
                    compareFunction(a.stories.available,b.stories.available, true));
                break;

            default:
                break;
        }

        //THIRD FILTER -- CHECK FOR TYPED NAME
        let wordFilteredCharacters = tempCharacters.filter( chars => {
            let lowerCaseName = chars.name.toLowerCase();
            let lowerCaseWord = filterWord.toLowerCase();

            return lowerCaseName.includes(lowerCaseWord);
        });

        //SHOW ONLY BOOKED ONES
        if(onlyBooked){
        let onlyBookedFiltered = wordFilteredCharacters.filter( chars => {
            let isBooked = localStorage.getItem(chars.id);

            
            return isBooked;
        });

        this.setState({filteredCharacters: onlyBookedFiltered});
        }
        else
        this.setState({filteredCharacters: wordFilteredCharacters});;

    }

    render () {
        const {
            filterby, 
            currentfilterComic,
            loading,
            filteredCharacters,
        } = this.state;

        
        return (
            <div className="container" style={{ paddingTop: '70px' }}>
                <div className="row">
                    <h1 className="text-dark">Characters</h1>
                </div>
                {filteredCharacters === undefined ? (
                    <div className="row">
                        <p>no data available</p>
                    </div>
                ) : (
                <>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <div className="form-check " style={{alignSelf: 'center'}}>
                            <input className="form-check-input" type="checkbox" value="checked" onChange={this.HandleCheckboxState} id="onlyBooked" />
                            <label className="form-check-label" for="onlyBooked" >
                                Show Only Booked
                            </label>
                        </div>
                    </div>
                    <div className="col-auto">
                        <DropDown 
                            title="Order By"
                            currentValue={filterby}
                            selectedCallback={this.setOrderBy}
                            items={OrderByValues}
                        />
                    </div>
                    <div className="col-auto">
                        <DropDown 
                            title="Comic"
                            currentValue={trimString(currentfilterComic, 20)}
                            selectedCallback={this.setFilterComic}
                            items={filterComic}
                        />
                    </div>
                    <div className="col-auto">
                        <input
                            type="text"
                            className="form-control"
                            onChange={ this.setFilterWord }
                            placeholder="Search by name..."
                            aria-label="Search"
                            aria-describedby="addon-wrapping"
                        />
                    </div>
                </div>
                <hr />
                <CharactersList
                    characters={filteredCharacters}
                    isLoading={loading}
                />
                </>
                )}
            </div>
        );
    }
}

export default Characters;