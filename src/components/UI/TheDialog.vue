<template>
    <div @click="$emit('close')" class="bg-black bg-opacity-80 flex items-center justify-center w-full h-screen top-0 left-0 absolute z-50">
        <div class="flex flex-col bg-white p-6 rounded-md gap-6 w-3/4">
            <p class="text-sm"><slot></slot></p>
            <div class="flex justify-end gap-2 w-full text-sm">
                <button class="px-6 py-2 border border-black rounded bg-black text-white active:bg-red-500 active:border-transparent" @click="$emit('close')">No</button>

                <button class="px-6 py-2 border border-black rounded active:bg-blue-500 active:text-white active:border-transparent" @click="$emit('accept')">Yes</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits:['accept','close']
}
</script>