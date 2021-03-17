import React from 'react';
import './style.css';

class CharacterInfoScreen extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            character: {},
            isDark: false,
            url_one: '',
            url_two: '',
            url_three: '',
        }
    }

    componentDidMount(){
        let char = JSON.parse(localStorage.getItem('selectedChar'));
        this.setState({character: char}, () => {
            this.setState({
                url_one: this.state.character.urls[0] || "",
                url_two: this.state.character.urls[1] || "",
                url_three: this.state.character.urls[2] || ""
            })
            console.log('SELECTED CHAR', this.state.character.urls[0])
        });
    }

    componentDidUpdate(){
        console.log('updated!');
    }

    render(){
        let {character, isDark, url_one, url_two, url_three} = this.state;
        let textColor = isDark? 'text-light' : 'text-dark';
        let bgColor = isDark? 'bg-dark' : 'bg-light';
        let imgURL = character.thumbnail?.path + "." + character.thumbnail?.extension;

        const RenderComics = comics => {
        return <ul>
            {comics.items.slice(0,3).map(comic => {
                    return <li>
                        <p>{comic.name}</p>
                        </li>  
                    }
                )}
        </ul>
        }

        return(
            <div className='popup-full-screen'>
                <div className={'box ' + bgColor}>
                    <div className={'container top-content ' + textColor}>
                        <div className='space-arround'>
                            <div className='popup-character-avatar' style={{backgroundImage: `url(${imgURL})` }} />
                        </div>
                        <div className='space-between container'>
                            <p className='popup-description-text'>
                                <h3 style={{ position: 'relative'}}>{character.name || 'NO NAME' }</h3>

                                {character.description || 'NO DESCRIPTION'}
                            </p>
                            <div className="horizontal-row">
                                {!url_one.url? null   : <li><a target="_blank" rel="noreferrer" className="btn" href={url_one.url}>Details </a> </li>}
                                {!url_two.url? null   : <li><a target="_blank" rel="noreferrer" className="btn" href={url_two.url}>Wiki </a></li>}
                                {!url_three.url? null : <li><a target="_blank" rel="noreferrer" className="btn" href={url_three.url}>ComicLinks </a></li>}
                            </div>
                        </div>
                    </div>
                    <div className={'popup-content-body ' + textColor}>
                        <div className="bg-dark popup-footer" style={{width: '100%', position: 'relative'}}>
                            <div className="container-fluid text-muted" style={{width: '100%', height: '100%', fontSize: '16px', padding: '30px'}}>

                            <h3>COMICS</h3>
                                <div className="horizontal-row">{
                                    character.comics? RenderComics(character.comics) : '...Loading'
                                    }
                                </div>
                            <h3>SERIES</h3>
                                <div className="horizontal-row">{
                                    character.series? RenderComics(character.series) : '...Loading'
                                    }
                                </div>
                            <h3>STORIES</h3>
                                <div className="horizontal-row">{
                                    character.stories? RenderComics(character.stories) : '...Loading'
                                    }
                                </div>     
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default CharacterInfoScreen;