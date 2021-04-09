<template>
    <nav class="nav">
        <img class="nav__logo" src="https://thunderchicken.nl/freespace/img/logo.svg" alt="Logo">
        <span class="nav__span nav__title">universe</span>
        <ul class="nav__list">
            <li class="nav__list-item"><a class="nav__link" href="#">champions</a></li>
            <li class="nav__list-item"><a class="nav__link" href="#">regions</a></li>
            <li class="nav__list-item"><a class="nav__link" href="#">comics</a></li>
            <li class="nav__list-item">
                <span class="nav__list-title">alt universe <span>▼</span></span>
                <ul class="nav__sublist">
                    <li class="nav__sublist-item"><a class="nav__link" href="#">star guardian</a></li>
                    <li class="nav__sublist-item"><a class="nav__link" href="#">odyssey</a></li>
                    <li class="nav__sublist-item"><a class="nav__link" href="#">K/DA</a></li>
                </ul>
            </li>
            <li class="nav__list-item"><a class="nav__link" href="#">map</a></li>
            <li class="nav__list-item"><a class="nav__link" href="#">explore</a></li>
            <li class="nav__list-item"><a class="nav__link" href="#">search</a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'navigation'
}
</script>

<style lang="scss">
    $component: 'nav';
    .#{$component}{
        background: $color-black;
        height: 5rem;
        display: flex;
        padding: 0 3.5rem;
        padding-left: 5rem;

        &__logo{
            max-width: 2rem;
        }

        &__link {
            text-decoration: none;
        }

        &__list{
            list-style: none;
        }

        &__link,
        &__span,
        &__list-title {
            color: $color-white;
            font-family: $font-spiegel;
            text-transform: uppercase;
            letter-spacing: .1rem;
            font-size: $font-size-xsmall;
        }

        &__span {
            line-height: 5rem;
            font-size: $font-size-medium;
            padding: 0 .5rem;
            margin: 0 0.85em;
        }

        &__list {
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 100%;
        }

        &__list-item {
            position: relative;
            height: 100%;
            border-bottom: 2px solid transparent;
            transition: .3s ease border-color;
            align-self: center;

            &:hover,
            &:focus {
                border-color: $color-blue;
            }

            .#{$component}__link,
            .#{$component}__list-title {
                display: block;
                padding: .1rem .75rem;
                height: 100%;
                line-height: 4.75rem;
            }

            &:hover .#{$component}__sublist {
                display: block;
            }

        }

        &__sublist {
            display: none;
            position: absolute;
            top: calc(100% + 2px);
            left: 0;
            background-color: $color-black;
            min-width: 200px;
            z-index: 10;
        }

        &__sublist-item {            
            display: block;

            &:hover {
                background-color: rgba($color-grey, .25);
            }

            .#{$component}__link {
                padding: .25rem 2rem;
                line-height: 2.75rem;
                display: block;
            }
        }
    }

</style>