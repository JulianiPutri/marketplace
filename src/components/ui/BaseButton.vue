<template>
    <button class="btn rounded-1" @click="$emit('clickButton')">
        <slot></slot>
    </button>
</template>