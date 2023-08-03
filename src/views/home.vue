<template>
    <div class="my-home">
        <h1>你好{{ name }}</h1>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'my-home',
    components: {

    },
    mixins: [],
    props: {

    },
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            name: state => state.user.name,
        })
    },
    watch: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>
<style scoped>
.my-home {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>