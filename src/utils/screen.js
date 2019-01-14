export const isMobile = () => {
    let viewportWidth = document.documentElement.clientWidth

    if(viewportWidth >= 100 && viewportWidth <= 500){
        return true
    }else{
        return false
    }
}