function myParse(str){
    return (new Function('return'+str))()
}