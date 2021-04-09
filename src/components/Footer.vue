<template>
    <footer class="footer">
        <address>
            <a href="https://github.com/Senpaizuri/">@Senpaizuri</a>
        </address>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="scss">
    $component: 'footer';
    .#{$component}{
        background: $color-black--dark;
        text-align: center;
        padding: 2rem 3rem;
        a{
            color: $color-white;
        }
    }
</style>