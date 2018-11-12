<template lang="pug">
    qrcode(:value="code")
</template>

<script>
export default {
    name: "Show",
    data() {
        return {
            code: "Avaz Alimov"
        }
    }
};
</script>

<style scoped>
</style>
