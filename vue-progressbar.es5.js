'use strict';
var _vueProgressbar = require('./vue-progressbar.vue'), _vueProgressbar2 = _interopRequireDefault(_vueProgressbar);
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj}
}
function assign(a) {// eslint-disable-line no-unused-vars
    for (var c, d, b = 1; b < arguments.length; ++b)for (c in d = arguments[b], d)Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    return a
}
module.exports.install = function (a) {
    var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
    '2' === a.version.split('.')[0];
    var c = 'undefined' != typeof window, d = {
        $vm: null,
        state: {tFailColor: '', tColor: '', timer: null, cut: 0},
        init: function init(g) {
            this.$vm = g
        },
        start: function start(g) {
            var _this = this;
            this.$vm && (!g && (g = 3e3), this.$vm.RADON_LOADING_BAR.percent = 0, this.$vm.RADON_LOADING_BAR.options.show = !0, this.$vm.RADON_LOADING_BAR.options.canSuccess = !0, this.state.cut = 1e4 / Math.floor(g), this.state.timer = setInterval(function () {
                _this.increase(_this.state.cut * Math.random()), 95 < _this.$vm.RADON_LOADING_BAR.percent && _this.finish()
            }, 100))
        },
        set: function set(g) {
            this.$vm.RADON_LOADING_BAR.options.show = !0, this.$vm.RADON_LOADING_BAR.options.canSuccess = !0, this.$vm.RADON_LOADING_BAR.percent = Math.floor(g)
        },
        get: function get() {
            return Math.floor(this.$vm.RADON_LOADING_BAR.percent)
        },
        increase: function increase(g) {
            this.$vm.RADON_LOADING_BAR.percent += Math.floor(g)
        },
        decrease: function decrease(g) {
            this.$vm.RADON_LOADING_BAR.percent -= Math.floor(g)
        },
        hide: function hide() {
            var _this2 = this;
            clearInterval(this.state.timer), this.state.timer = null, setTimeout(function () {
                _this2.$vm.RADON_LOADING_BAR.options.show = !1, a.nextTick(function () {
                    setTimeout(function () {
                        _this2.$vm.RADON_LOADING_BAR.percent = 0
                    }, 100), _this2.$vm.RADON_LOADING_BAR.options.autoRevert && setTimeout(function () {
                        _this2.revert()
                    }, 300)
                })
            }, 800)
        },
        pause: function pause() {
            clearInterval(this.state.timer)
        },
        finish: function finish() {
            this.$vm && (this.$vm.RADON_LOADING_BAR.percent = 100, this.hide())
        },
        fail: function fail() {
            this.$vm.RADON_LOADING_BAR.options.canSuccess = !1, this.$vm.RADON_LOADING_BAR.percent = 100, this.hide()
        },
        setFailColor: function setFailColor(g) {
            this.$vm.RADON_LOADING_BAR.options.failedColor = g
        },
        setColor: function setColor(g) {
            this.$vm.RADON_LOADING_BAR.options.color = g
        },
        setFontColor: function setFontColor(g) {
            this.$vm.RADON_LOADING_BAR.options.fontColor = g
        },
        setLocation: function setLocation(g) {
            this.$vm.RADON_LOADING_BAR.options.location = g
        },
        setTransition: function setTransition(g) {
            this.$vm.RADON_LOADING_BAR.options.transition = g
        },
        tempFailColor: function tempFailColor(g) {
            this.state.tFailColor = this.$vm.RADON_LOADING_BAR.options.failedColor, this.$vm.RADON_LOADING_BAR.options.failedColor = g
        },
        tempColor: function tempColor(g) {
            this.state.tColor = this.$vm.RADON_LOADING_BAR.options.color, this.$vm.RADON_LOADING_BAR.options.color = g
        },
        tempLocation: function tempLocation(g) {
            this.state.tLocation = this.$vm.RADON_LOADING_BAR.options.location, this.$vm.RADON_LOADING_BAR.options.location = g
        },
        tempTransition: function tempTransition(g) {
            this.state.tTransition = this.$vm.RADON_LOADING_BAR.options.transition, this.$vm.RADON_LOADING_BAR.options.transition = g
        },
        revertColor: function revertColor() {
            this.$vm.RADON_LOADING_BAR.options.color = this.state.tColor, this.state.tColor = ''
        },
        revertFailColor: function revertFailColor() {
            this.$vm.RADON_LOADING_BAR.options.failedColor = this.state.tFailColor, this.state.tFailColor = ''
        },
        revertLocation: function revertLocation() {
            this.$vm.RADON_LOADING_BAR.options.location = this.state.tLocation, this.state.tLocation = ''
        },
        revertTransition: function revertTransition() {
            this.$vm.RADON_LOADING_BAR.options.transition = this.state.tTransition, this.state.tTransition = {}
        },
        revert: function revert() {
            this.$vm.RADON_LOADING_BAR.options.autoRevert && (this.state.tColor && this.revertColor(), this.state.tFailColor && this.revertFailColor(), this.state.tLocation && this.revertLocation(), this.state.tTransition && (this.state.tTransition.speed !== void 0 || this.state.tTransition.opacity !== void 0) && this.revertTransition())
        },
        parseMeta: function parseMeta(g) {
            for (var h in g.func) {
                var i = g.func[h];
                switch (i.call) {
                    case'color':
                        switch (i.modifier) {
                            case'set':
                                this.setColor(i.argument);
                                break;
                            case'temp':
                                this.tempColor(i.argument);
                        }
                        break;
                    case'fail':
                        switch (i.modifier) {
                            case'set':
                                this.setFailColor(i.argument);
                                break;
                            case'temp':
                                this.tempFailColor(i.argument);
                        }
                        break;
                    case'location':
                        switch (i.modifier) {
                            case'set':
                                this.setLocation(i.argument);
                                break;
                            case'temp':
                                this.tempLocation(i.argument);
                        }
                        break;
                    case'transition':
                        switch (i.modifier) {
                            case'set':
                                this.setTransition(i.argument);
                                break;
                            case'temp':
                                this.tempTransition(i.argument);
                        }
                }
            }
        }
    }, e = assign({
        canSuccess: !0,
        show: !1,
        color: '#73ccec',
        fontColor: 'red',
        failedColor: 'red',
        thickness: '2px',
        transition: {speed: '0.2s', opacity: '0.6s'},
        autoRevert: !0,
        location: 'top',
        inverse: !1
    }, b), f = new a({data: {RADON_LOADING_BAR: {percent: 0, options: e}}});
    c && (window.VueProgressBarEventBus = f, d.init(f)), a.component('vue-progress-bar', _vueProgressbar2.default), a.prototype.$Progress = d
};