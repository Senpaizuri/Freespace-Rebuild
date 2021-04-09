<template>
    <button class="light-switch" v-on:click="toggleMode">
        <svg style="height: 22px; width: 22px;" x="0px" y="0px" viewBox="2 -1 37.1 43" xml:space="preserve">
            <path fill="currentColor"
                d="M18.9,38.8c-9.4,0-17-7.7-17-17.1s7.6-17.1,17-17.1S36,12.4,36,21.7S28.4,38.8,18.9,38.8z M18.9,5.6 C10,5.6,2.8,12.9,2.8,21.7S10,37.8,18.9,37.8S35,30.6,35,21.7S27.6,5.6,18.9,5.6z">
            </path>
            <rect fill="currentColor" x="19.9" y="5.6" width="0.9" height="32.8"></rect>
            <path fill="currentColor" d="M4.1,21.9c0,8.1,6.5,14.6,14.6,14.7V7.2C10.9,7.1,4.1,13.7,4.1,21.9z"></path>
        </svg>
    </button>
</template>

<script>
export default {
    name: 'LightSwitch',
    methods:{
       toggleMode(){
            this.$store.commit('setLightMode', !this.lightMode)
        },
    },
    computed:{
        lightMode(){
            return this.$store.getters['getLightMode']
        },
    }
}
</script>

<style lang="scss">
    $component: 'light-switch';
    .#{$component}{
        display: block;
        border: none;
        position: fixed;
        left: 1.75rem;
        top: 1.5rem;
        border-radius: 50%;
        padding: .3rem .45rem;

        color: $color-grey--light;
        background: $color-black--dark;

        transition: .3s ease all;
        
        .light-mode &{
            color: $color-black--dark;
            background: $color-grey--light;
        }
    }
</style>