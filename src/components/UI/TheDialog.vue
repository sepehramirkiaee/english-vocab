<template>
    <div @click="$emit('close')" class="bg-black bg-opacity-80 flex items-center justify-center w-full h-screen top-0 left-0 absolute z-50">
        <div class="flex flex-col bg-white p-6 rounded-md gap-6 w-3/4">
            <p><slot></slot></p>
            <div class="flex justify-end gap-2 w-full">
                <button class="px-6 py-2 border border-gray-400 rounded" @click="$emit('close')">No</button>

                <button class="px-6 py-2 border border-gray-400 rounded" @click="$emit('accept')">Yes</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits:['accept','close']
}
</script>