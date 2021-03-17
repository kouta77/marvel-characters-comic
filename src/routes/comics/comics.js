import React from 'react';
import { getComics } from '../../services/apiProvider';
import { ComicsList, DropDown } from '../../components';
import { compareFunction } from '../../helpers/helpers';

import './styles.css';

const orderByValues = [
    {id: 0, name: 'title - asc', value:'title - asc'},
    {id: 1, name: 'title - desc', value:'title - desc'},
    {id: 2, name: 'issue # - asc', value:'issue # - asc'},
    {id: 3, name: 'issue # - desc', value:'issue # - desc'},
];

let filterFormat = [
    {id: -100, name: 'All', value: 'All'}
];

class Comics extends React.Component {
    constructor(props){
        super(props);

        this.setFilterWord = this.setFilterWord.bind(this);
        this.setFormatFilter = this.setFormatFilter.bind(this);
        this.handleCheckboxState = this.handleCheckboxState.bind(this);
        this.setNewFilterBy = this.setNewFilterBy.bind(this);
        this.setFilterIssue = this.setFilterIssue.bind(this);
        this.HandleFilterChange = this.HandleFilterChange.bind(this);

        this.state = { 
            comics: [],
            filterBy: "",
            format: "",
            filterWord: '',
            onlyBooked: false,
            loading: true,
            filterNumber: -1,
            filteredComics: [],
        };

        
    }
     
    componentWillMount(){
        getComics().then(comics => {
            comics?.forEach( comic => {
                if (comic.format && !filterFormat.some( obj => obj.name === comic.format ))
                    filterFormat.push({id: comic.id , name: comic.format, value: comic.format});
            });
            // console.log(comics);
            this.setState(
                { comics: comics, filterBy: "name - asc" },
                ()=>{
                    this.setState({loading: false});
                    this.HandleFilterChange();
                    }
                );
        });
    }

    setFormatFilter = form => {
        this.setState({format: form}, ()=> this.HandleFilterChange() );
    }

    setFilterWord = word => {
        this.setState({filterWord: word.target.value}, ()=> this.HandleFilterChange() );
    }

    setFilterIssue = number => {
        this.setState({filterNumber: number.target.value}, ()=> this.HandleFilterChange() );
    }

    
    handleCheckboxState(event){
        const target = event.target;
        const checked = target.checked;

        this.setState({
            onlyBooked: checked
        }, ()=> this.HandleFilterChange());
    }

    setNewFilterBy(filter) {
        this.setState({filterBy: filter}, ()=> this.HandleFilterChange());
    }

    HandleFilterChange(){
        const {
            comics,
            filterBy,
            format,
            filterWord,
            onlyBooked,
            filterNumber
        } = this.state;

        let sortedComics = [...comics];

        console.log(format);
        
        //START APPLYING ALL FILTERS
        if(format !== '' && !format !== 'All') {
            let byFormat = sortedComics.filter( comic => {
                return comic.format === format
                }
            );
            sortedComics = [...byFormat];
        }
        else{
            sortedComics = [...comics];
        }

        if(filterNumber > 0) {
            let byIssue = sortedComics.filter( comic => {
                return comic.issueNumber === filterNumber
                }
            );
            console.log('byIssue', byIssue);
            sortedComics = [...byIssue];
        }
        // else{
        //     sortedComics = [...comics];
        // }

        switch (filterBy) {
            case 'title - asc': case 'title - desc':
                let _asc = filterBy.includes('asc');
                sortedComics.sort((a,b) => compareFunction(a.title,b.title, _asc));
                break;
            case 'issue # - asc': case 'issue # - desc':
                let asc = filterBy.includes('asc');
                sortedComics.sort((a,b) => compareFunction(a.issueNumber,b.issueNumber, asc));
                break;
        

            default:
                break;
        }

        let wordFilteredComics = sortedComics.filter( comic => {
            let lowerCaseName = comic.title.toLowerCase();
            let lowerCaseWord = filterWord.toLowerCase();

            return lowerCaseName.includes(lowerCaseWord);
        });

    //SHOW ONLY BOOKED ONES
        if(onlyBooked){
            let onlyBookedFiltered = wordFilteredComics.filter( comic => {
                let isBooked = localStorage.getItem(comic.id);

                return isBooked;
            });
            
            this.setState({filteredComics:onlyBookedFiltered});
        }
        else {
            this.setState({filteredComics:wordFilteredComics});
        }
    }

    render () {
        const {
            filterBy,
            format,
            loading,
            filteredComics
        } = this.state;




        return (
            filteredComics===undefined? 
            <div className="container-padding">
                <div id="second-row" className="container-fluid comics-second-row" >
                        <h1 className="text-light">Comics</h1>
                </div>
                    <div className="container-fluid">
                        <p>no data available</p>
                    </div>
            </div>
            :
            <div className="container">
                <div className="container-padding">
                    <div id="second-row" className="container-fluid comics-second-row" >
                        <h1 className="text-light">Comics</h1>
                    </div>


                    <div id="second-row" className="container character-second-row character-filters-row" >

                        <div className="form-check " style={{alignSelf: 'center'}}>
                            <input className="form-check-input" type="checkbox" value="checked" onChange={this.handleCheckboxState} id="onlyBooked" />
                            <label className="form-check-label text-light" for="onlyBooked" >
                                Show Only Booked
                            </label>
                        </div>
                        
                        <DropDown 
                            title="Format"
                            currentValue={format}
                            selectedCallback={this.setFormatFilter}
                            items={filterFormat}
                            isDark
                        />

                        <DropDown 
                            title="OrderBy"
                            currentValue={filterBy}
                            selectedCallback={this.setNewFilterBy}
                            items={orderByValues}
                            isDark
                        />

                        <div className="w-25">
                            <input
                                type="text"
                                className="form-control btn-dark"
                                onChange={ this.setFilterWord }
                                placeholder="Search by Title..."
                                aria-label="Search"
                                aria-describedby="addon-wrapping"
                            />
                        </div>
                        <div style={{width:'100px'}}>
                        <input
                            type="number"
                            className="form-control btn-dark"
                            onChange={ this.setFilterIssue }
                            placeholder="Issue #"
                            aria-label="filter-issue"
                            aria-describedby="addon-wrapping"
                            min={0}
                            />
                        </div>
                    </div>

                    <hr />
                    <ComicsList
                        comicsList={filteredComics}
                        isLoading={loading}
                    />

                </div>
            </div>
        );
    }
}

export default Comics;