module.exports = {
    css:{
        loaderOptions:{
            scss:{
                prependData: `@import "@/scss/index.scss";`
            }
        }
    }
}