import { ComicCard } from '..';

const ComicsList = ({comicsList,isLoading}) => {
    
    return (
            <div className="row align-items-start"> 
            {
            comicsList.length > 0 ?
            comicsList.map(comic => {
                let imgURL = comic.thumbnail.path + "." + comic.thumbnail.extension;
                return (
                    <ComicCard
                    id={comic.id}
                    key={comic.id}
                    name={comic.title}
                    description={comic.description}
                    image={imgURL}
                    issueNumber={comic.issueNumber}
                    onClick= {() => 
                        localStorage.setItem('selectedComic', JSON.stringify(comic))
                    }
                />)
                }
            ) : <div> <p className="text-light"> {isLoading ? "...Loading" : "No data found"}</p> </div>
            }
        </div>
    )
}

export default ComicsList;