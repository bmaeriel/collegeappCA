<template>
<div>
    <b-tabs pills card vertical class="tabs" justified>
        <b-tab title="Courses" active class="tab-body" @click="$router.push('/')">
            <router-view> </router-view>
        </b-tab>
        <b-tab title="Lecturers" class="tab-body" @click="$router.push('/lecturers')">
            <router-view> </router-view>
        </b-tab>
        <b-tab title="Enrolments" class="tab-body" @click="$router.push('/enrolments')">
            <router-view> </router-view>
        </b-tab>
    </b-tabs>
</div>
</template>
<script>
export default {
    name: 'home'
}
</script>
<style>

</style>
