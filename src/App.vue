<template>
    <div class="app" :class="{'light-mode':lightMode}">
        <Navigation />
        <router-view />
        <!-- <Footer /> -->
    </div>
</template>

<script>
import Navigation from './components/Navigation'
import Footer from './components/Footer'
export default {
    name: 'app',
    components:{
        Navigation,
        Footer
    },
    computed:{
        lightMode(){
            return this.$store.getters['getLightMode']
        }
    },
    mounted(){

    }
}
</script>

<style lang="scss">
    $component: 'app';
    .#{$component}{
        background-color: $color-black--dark;
        transition: .3s ease all;
        &.light-mode{
            background-color: $color-grey--light;
        }
    }
</style>