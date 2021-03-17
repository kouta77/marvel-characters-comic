import React from 'react';
import { ComicImage } from '../../components';

class ComicInfoScreen extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            comic: {},
            isDark: true,
        }
    }

    componentDidMount(){
        let comi = JSON.parse(localStorage.getItem('selectedComic'));
        this.setState({comic: comi}, () => {console.log('SELECTED COMIC', this.state.comic)});
    }

    render(){
        let {comic, isDark} = this.state;
        let textColor = isDark? 'text-light' : 'text-dark';
        let bgColor = isDark? 'bg-dark' : 'bg-light';
        let imgURL = comic.thumbnail?.path + "." + comic.thumbnail?.extension;
        let creator = comic?.creators?.items[0];

        console.log('creator', creator?.name);

        const RenderImage = images => {
            return images.slice(0,3).map(img => {
            return <ComicImage
                        key={img.path}
                        name='image'
                        // description={comic.description}
                        image={img.path + "." + img.extension}
                        // issueNumber={comic.issueNumber}
                        />   
                    })
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
                            <h3 style={{position: 'relative'}}>{comic?.title || 'NO NAME' }</h3>
                            <br />
                            {comic?.description || 'NO DESCRIPTION'}
                        </p>

                            <div className="horizontal-row">
                                {!comic?.creators?.items?.length > 0? null   : <li>{"Creator: " + comic?.creators?.items[0].name}</li>}
                                {!comic?.modified > 0? null   : <li>{
                                "Modified: " + comic?.modified.split("T")[0]}</li>}
                            </div>
                        </div>

                    </div>

                    <div className={'popup-content-body ' + textColor}>
                        <div className="bg-light popup-footer" style={{width: '100%', position: 'relative'}}>
                            <div className="container-fluid text-muted" style={{width: '100%', height: '100%', fontSize: '16px', padding: '30px'}}>

                            <h3>IMAGES</h3>
                                <div className="horizontal-row">{
                                     comic?.images? RenderImage(comic.images) : '...Loading'
                                    }
                                </div>
                            {/*<h3>SERIES</h3>
                                 <div className="horizontal-row">{
                                    comic.images.length > 0? RenderImage(comic.images) : '...Loading'
                                    }
                                </div> */}
                            {/* <h3>STORIES</h3>
                                <div className="horizontal-row">{
                                    character.stories? RenderComics(character.stories) : '...Loading'
                                    }
                                </div>      */}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default ComicInfoScreen;