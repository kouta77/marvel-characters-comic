import { CharacterCard } from '..';

const CharactersList = ({characters, isLoading}) => {

    return (
        <div className="row align-items-start">
            {characters.length > 0 ?
            characters.map(character => {
                let imgURL = character.thumbnail.path + "." + character.thumbnail.extension;
                imgURL = imgURL.replace('http', 'https');
                
                if(imgURL.includes('image_not_available'))
                    imgURL = null
                // console.log('HTTPS', imgURL);
                // return null;
                return (
                    <CharacterCard
                        id={character.id}
                        key={character.id}
                        name={character.name}
                        description={character.description}
                        image={imgURL}
                        comicsCount={character.comics.available}
                        onClick={()=> {
                        localStorage.setItem('selectedChar', JSON.stringify(character));
                        }}
                    />
                )
            }
            ) : <div> <p className="text-center"> {isLoading ? "...Loading" : "No data found"}</p> </div>}
        </div>
    )
}

export default CharactersList;