<style>

    .__cov-progress {
        position: fixed;
        opacity: 1;
        z-index: 999999;
        top: 0px;
        left: 0px;
    }

</style>
<template>
    <div class="__cov-progress" v-show="percent">
        <div class="row">
            <div class="img-container">
                <img src="img/logo.png">
            </div>
            <div class="bar-container">
                <div class="border-box">
                    <div :style="style"></div>
                </div>
                <p class="text-center"><b>Precision:&nbsp;<span :style="fontStyle">{{accuracy}}</span></b></p>
            </div>
        </div>
    </div>
</template>
<script>
const inBrowser = typeof window !== 'undefined'
export default {
    name: 'VueProgress',
    serverCacheKey: () => 'Progress',
    computed: {
        percent() {
            return this.progress.percent
        },
        fontStyle () {
            var style = {
                'color': this.progress.options.fontColor
            }
            console.log(style);
            return style
        },
        accuracy () {
            if (this.progress.percent <= 40) {
                return 'Low';
            }else if (this.progress.percent <= 80 ) {
                return 'Fair';
            }else {
                return 'High';
            }
        },
        style () {
            let location = this.progress.options.location
            let style = {
                'background': this.progress.options.canSuccess ? this.progress.options.color : this.progress.options.failedColor,
                'opacity': this.progress.options.show ? 1 : 0
            }
            style.width = this.progress.percent + '%'
            style.height = this.progress.options.thickness
            style.transition = "width " + this.progress.options.transition.speed + ", opacity " + this.progress.options.transition.opacity

            return style
        },
        progress() {
            if (inBrowser) {
                console.log(window.VueProgressBarEventBus.RADON_LOADING_BAR);
                return window.VueProgressBarEventBus.RADON_LOADING_BAR
            } else {
                return {
                    percent: 0,
                    options: {
                        canSuccess: true,
                        show: false,
                        color: 'rgb(19, 91, 55)',
                        fontColor: 'red',
                        failedColor: 'red',
                        thickness: '2px',
                        transition: {
                            speed: '0.2s',
                            opacity: '0.6s'
                        },
                        location: 'top',
                        autoRevert: true,
                        inverse: false
                    }
                }
            }
        }
    }
}

</script>
