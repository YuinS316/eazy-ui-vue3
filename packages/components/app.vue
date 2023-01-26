<script lang="ts" setup>
import { EzButton } from "@/index";
const handleClick = (e: Event) => {
  console.log(e);
};
</script>

<template>
  <div>启动测试</div>
  <ez-button @onClick="handleClick"></ez-button>
</template>
