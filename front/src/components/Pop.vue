<template>
    <div>
      <div class="pop-mask" v-show="show" @click="hide"></div>
      <div class='pop-popup pop-popup-middle' v-show="show" @click="closeMask">
        {{msg}}
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    props: {
			show: {
				type: Boolean,
				default: false
			},
			msg: {
				type: String,
				default: ""
            },
            mode: {
				type: String,
				default: 'otherArea'
			},
        },
        methods: {
			hide: function() {
				if (this.mode === 'thisArea') return;
				this.$emit('hidePopup');
			},
			closeMask() {
				if (this.mode === 'otherArea') {
					this.$emit('hidePopup');
				}
			},
		}
};
</script>

<style>
.pop-mask {
		position: absolute;
		height: 100vh;
		z-index: 998;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.pop-popup {
		position: absolute;
		z-index: 999;
		background-color: #ffffff;
	}

	.pop-popup-middle {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
