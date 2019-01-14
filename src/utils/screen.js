export const isMobile = () => {
    if(typeof(document) !== 'undefined'){
        let viewportWidth = document.documentElement.clientWidth

        if(viewportWidth >= 100 && viewportWidth <= 500){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}