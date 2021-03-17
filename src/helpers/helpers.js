const trimString = (text, max_length) => {
    if(text.length > max_length - 3){
        return text.substring(0, max_length).trimEnd() + "..."
    }
    else{
        return text
    }
}

const compareFunction = (a,b,asc) => {
    if(asc){
    if (a > b)  return 1;
    if (a < b)  return -1;
    }
    else{
    if (a < b)  return 1;
    if (a > b)  return -1;
    }
    return 0
}

export {
    trimString,
    compareFunction,
};